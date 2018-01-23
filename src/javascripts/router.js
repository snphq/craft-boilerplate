// Window Location
const pathName = window.location.pathname;
const pathParams = pathName.split('/');

// Dynamically Load Modules
switch (pathParams[1]) {
  // Home Page
  case '':
    // Import the module
    import('./pages/home').then(() => {
      console.log('import -> home.js');
    });

    console.log('Import "Home Page" modules');
    break;

  case 'example':
    // Import the module
    import('./pages/example').then(() => {
      console.log('import -> example.js');
    });

    console.log('Import "Example Page" modules');
    break;

  // Fallback Page
  default:
    console.log('Import "default" modules');
}

console.log(`NOTE: Switch statement expression is: ${pathParams[1]}`);
console.log('NOTE: Router.js file has imported');
console.log(`NOTE: window.location.pathname is ${pathName}`);
