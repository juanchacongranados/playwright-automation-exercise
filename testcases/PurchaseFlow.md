# TC-001: Purchase Flow – Shopping Cart Checkout

## 1. Precondiciones
1. Tener Node.js, npm, Git y Visual Studio Code instalados (ver README).  
2. Haber instalado las dependencias (`@playwright/test`, `faker`, navegadores con `npx playwright install`).  
3. No tener sesión iniciada en https://automationexercise.com/ (modo “guest”).

## 2. Pasos de Prueba
1. Abrir el navegador (Desktop y Mobile) y navegar a `https://automationexercise.com`.  
   - Esperar a que cargue la página principal.
2. Hacer clic en el enlace “Products” del menú superior.  
   - Verificar que aparece la lista de productos.
3. Localizar el **tercer producto** en la cuadrícula de productos.  
   - Hacer clic en “View Product” para ir a la página de detalle de ese producto.
4. En la página de detalle de producto:  
   - Generar una **cantidad aleatoria** entre 1 y 20 (usando `fakerHelper.js`).  
   - Escribir esa cantidad en el campo “Quantity”.
5. Hacer clic en el botón “Add to cart”.  
   - Verificar que aparece un modal/pop-up que dice “Product added to cart”.
6. En el modal, hacer clic en “Proceed to checkout”.  
   - Verificar que la URL cambió a `/view_cart` o `/checkout`.
7. **(Paso obligatorio)** Validar que se muestra el modal “Register / Login”  
   (porque no estamos autenticados).  
   - Detener el flujo aquí.

### Pasos Opcionales (si decides implementarlos)
8. En el modal “Register / Login”, hacer clic en “Register” y completar el formulario con datos aleatorios (nombre, email, contraseña) usando Faker.  
   - Verificar que el registro fue exitoso y que nos redirige al carrito.
9. En la página de carrito, hacer clic en “Place Order”.  
   - Completar datos de pago (pueden ser ficticios) y confirmar orden.
10. Hacer clic en “Logout” y verificar que se redirige a la página principal sin sesión.

## 3. Resultados Esperados
1. Al cargar la página principal, se ve el logotipo y el menú superior correctamente.  
2. Al hacer clic en “Products”, se muestran los productos en cuadrícula (imagen, precio, botón “View Product”).  
3. Al seleccionar el tercer producto, se va a su página de detalle.  
4. La cantidad aleatoria generada se ingresa correctamente en el campo “Quantity”.  
5. Al dar “Add to cart”, aparece modal con mensaje “Product added to cart”.  
6. Al hacer “Proceed to checkout”, la URL cambia a `/view_cart` o `/checkout`.  
7. Aparece el modal “Register / Login” (porque no hay sesión iniciada).  
8. **(Opcional)** Si se registra un nuevo usuario, se redirige al carrito tras registro.  
9. **(Opcional)** Al hacer “Place Order”, se confirma la orden y se ve la página de agradecimiento.  
10. **(Opcional)** “Logout” redirige a la página principal sin usuario logueado.
