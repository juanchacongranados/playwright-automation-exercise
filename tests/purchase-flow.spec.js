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
    // Opcionalmente, verificar que la URL apunte al detalle del tercer producto
    await expect(page).toHaveURL(/\/product_details\/\d+/);

    // 5. Paso 4: Generar cantidad aleatoria y setearla
    const randomQty = getRandomQuantity(1, 20);
    await productDetailPage.setQuantity(randomQty);
    const qtyValue = await page.inputValue(productDetailPage.quantityInput);
    expect(Number(qtyValue)).toBe(randomQty);

    // 6. Paso 5: Agregar al carrito y validar que aparezca el modal
    await productDetailPage.clickAddToCart();
    await expect(page.locator(productDetailPage.cartModal)).toBeVisible();
    await expect(page.locator(productDetailPage.cartModal))
      .toContainText('Your product has been added to cart');

    // 7. Paso 6: Hacer clic en “View Cart” dentro del modal para ir a /view_cart
    await productDetailPage.clickProceedToCheckout();
    await expect(page).toHaveURL(/\/view_cart/);

    // 8. Paso 7: En /view_cart, hacer clic en “Proceed To Checkout” para que aparezca el pop-up
    const proceedBtn = page.locator('a.check_out');
    await proceedBtn.waitFor({ state: 'visible', timeout: 5000 });
    await proceedBtn.click();

    // 9. Paso 8: Dentro del pop-up, hacer clic en “Register / Login” para ir a /login (o /signup)
    const registerLoginBtn = page.locator('u:has-text("Register / Login")');
    await registerLoginBtn.waitFor({ state: 'visible', timeout: 5000 });
    await Promise.all([
      page.waitForURL(/\/login/),
      registerLoginBtn.click(),
    ]);

    // 10. Paso 9: Validar que aparece la sección de “New User Signup!”
    await expect(page.locator('.signup-form')).toBeVisible();

    // FIN DEL FLUJO OBLIGATORIO
  });
});
