# Playwright Automation Exercise

Este repositorio contiene la solución al “QA Engineer Skill Test (Web Automation) 2024” usando Playwright.

## 1. Requisitos

* Node.js (v18 o superior)
* npm (v8 o superior)
* Git
* Visual Studio Code (recomendado)

## 2. Instalación

```bash
git clone https://github.com/juanchacongranados/playwright-automation-exercise.git
cd playwright-automation-exercise
npm install
npx playwright install
```

## 3. Estructura del Proyecto

```
.
├── pages/                 # Page Objects (POM)
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   └── CheckoutPage.js
├── tests/                 # Pruebas Playwright
│   ├── sanity.spec.js
│   └── purchase-flow.spec.js
├── utils/                 # Helpers (Faker, Lighthouse)
│   ├── fakerHelper.js
│   └── lighthouseHelper.js 
├── testcases/             # Documento de diseño PurchaseFlow.md
│   └── PurchaseFlow.md
├── node_modules/
├── playwright.config.js   # Configuración de Playwright (Desktop + Mobile)
├── package.json
├── README.md
└── .gitignore
```

## 4. Ejecutar Pruebas

Para ejecutar todos los tests en Desktop Chromium y Mobile Safari:

```bash
npm test
```

Los tests que se ejecutan son:

* `tests/sanity.spec.js`
* `tests/purchase-flow.spec.js` (incluye pasos obligatorios y opcionales)

Para abrir el reporte HTML generado por Playwright:

```bash
npm run test:report
```

## 5. Lighthouse: Accesibilidad y Performance (Opcional)

Para obtener métricas de accesibilidad y performance en la página principal:

```bash
npm run lighthouse
```

Esto ejecutará `utils/lighthouseHelper.js` y generará `lighthouse-report.html` en la raíz del repositorio. El helper utiliza Lighthouse y Chrome Headless para producir los informes de **performance** y **accessibility**.

## 6. Notas

1. El test case documentado (TC-001) está en `testcases/PurchaseFlow.md`.
2. Se implementa Page Object Model (carpeta `pages/`) para mantener el código modular.
3. Para modificar timeouts o viewports, edita `playwright.config.js`.
4. El directorio `playwright-report/` está en `.gitignore`; cada usuario puede generarlo localmente con `npm run test:report`.
