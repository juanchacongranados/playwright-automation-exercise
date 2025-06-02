// tests/purchase-flow.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { getRandomQuantity } = require('../utils/fakerHelper');

test.describe('Flujo de compra en automationexercise.com', () => {
  test('TC-001: Agregar tercer producto al carrito y validar modal de checkout', async ({ page }) => {
    // 1. Instanciar Page Objects
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailPage = new ProductDetailPage(page);

    // 2. Paso 1: Ir a home
    await homePage.goToHome();
    await expect(page).toHaveURL('https://automationexercise.com/');

    // 3. Paso 2: Ir a Products
    await homePage.clickProducts();
    await expect(page).toHaveURL(/\/products/);

    // 4. Paso 3: Hacer clic en “View Product” del tercer producto
    await productsPage.clickViewProductByIndex(3);
    // (Opcional) Validar la URL de detalle:
    // await expect(page).toHaveURL(/\/product_details\/3/);

    // 5. Paso 4: Generar cantidad aleatoria y setearla
    const randomQty = getRandomQuantity(1, 20);
    await productDetailPage.setQuantity(randomQty);
    // Verificar que el campo contenga ese valor:
    const qtyValue = await page.inputValue(productDetailPage.quantityInput);
    expect(Number(qtyValue)).toBe(randomQty);

    // 6. Paso 5: Agregar al carrito
    await productDetailPage.clickAddToCart();
    // Esperar y verificar modal visible
    await expect(page.locator(productDetailPage.cartModal)).toBeVisible();
    // Verificar texto en modal:
    await expect(page.locator(productDetailPage.cartModal)).toContainText('added to your cart');

    // 7. Paso 6: Proceed to checkout
    await productDetailPage.clickProceedToCheckout();
    // Validar que se redirige a view_cart o checkout
    await expect(page).toHaveURL(/view_cart|checkout/);

    // 8. Validar que aparece el modal de Register/Login (sin sesión)
    await expect(page.locator('form[action="/signup"]')).toBeVisible();

    // FIN DEL FLUJO OBLIGATORIO
  });
});
