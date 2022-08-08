/* SMOOTH HORIZONTAL SCROLL*/

//Este código es para hacer que la transición de cuando haces click en un link del menú sea fluida, ya que por defecto el cambio era instantáneo y sin scroll

const links = document.querySelectorAll(".menu ul li a");  //en la variable links guardamos todos los elementos a del menú

//en este bucle for vamos cogiendo cada elemento a de la lista de links y añadiendo un evento click que ejecute la función clickHandler
for (const link of links) {
  link.addEventListener("click", clickHandler);
}

//En la siguiente función, el preventDefault evita que el documento siga realmente el enlace, ya que nos interesa coger el propio enlace con getAttribute y hacer que se haga scroll suavemente con scrollIntoView

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");

  document.querySelector(href).scrollIntoView({
    behavior: "smooth"
  });

}



/* SHOW MENU WITH BUTTON */

//Este código hace que se muestre el menú cuando hacemos clic en el botón que aparece en cierto tamaño de pantalla

const menu_button = document.querySelector(".menu_button");  //guardamos el botón en una variable

//aquí decimos que si el botón está en pantalla, cuando hagamos clic, va a coger el ul con la clase menu_items y le va a añadir/quitar la clase de CSS "show", para que de esta forma se pueda mostrar/ocultar los elementos del menú haciendo clic en el mismo botón
if (menu_button){
  menu_button.addEventListener("click", ()=>{
    const menu_items = document.querySelector(".menu_items");
    menu_items.classList.toggle("show");
  })
}



/* AÑADIR/QUITAR LA CLASE "ACTIVE" AL ELEMENTO ACTUAL */


// Guardamos el ul en la variable menu 
var menu = document.querySelector(".menu_items");

//  Guardamos todos los elementos del menu que tengan la clase "menu_item"
var items = menu.getElementsByClassName("menu_item");

// Usamos el siguiente bucle for para comprobar a cuál de todos los elementos del menú es el actual, es decir, se le ha hecho clic, para añadirle la clase active
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // Si no hay clase active, el código se la pone al primer elemento de la lista por defecto, que en nuestro caso es Home
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Añade la clase active al elemento actual/seleccionado
    this.className += " active";
    menu.classList.toggle("show");
  });
}


/* SCROLL-AWARE NAVIGATION */

/* Este script nos permite saber qué sección se encuentra en pantalla, gracias al uso del IntersectionObserver API de JS, y darle la clase active al elemento del menú que se corresponda con esa sección*/

function selectElementByClass(className) {
  return document.querySelector(`.${className}`);
}

//Guardamos en variables las secciones que tenemos en la web, seleccionándolos por su clase

const sections = [
  selectElementByClass('home'),
  selectElementByClass('history'),
  selectElementByClass('dishes'),
  selectElementByClass('recipes'),
];

// Guardamos en otra variable los elementos del menú, también seleccionándolos por su clase*/

const navItems = {
  home: selectElementByClass('homeNavItem'),
  history: selectElementByClass('historyNavItem'),
  dishes: selectElementByClass('dishesNavItem'),
  recipes: selectElementByClass('recipesNavItem'),
};

// Opciones de configuración del Intersection observer, como qué elemento se va a usar como viewport, qué porcentaje del elemento es necesario para que se detecte que está en pantalla, etc. 
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7,
};

//creamos la función que va a recibir las entradas, es decir, las secciones 

function observerCallback(entries, observer) {
  entries.forEach((entry) => { // con esto recorremos cada una de las secciones
    if (entry.isIntersecting) { 
      //si la entrada está interseccionando con el viewport, es decir, la sección se encuentra en el viewport, se guarda en la variable navItem el elemento del menú que se corresponde con el id de la sección que está en pantalla 
      const navItem = navItems[entry.target.id];

      // añadimos la clase "active" al elemento del menú guardado antes en navItem
      navItem.classList.add('active');

      // quitamos la clase "active" de todos los otros elementos del menú que no sean iguales al navItem declarado arriba
      Object.values(navItems).forEach((item) => {
        if (item != navItem) {
          item.classList.remove('active');
        }
      });
    }
  });
}

//variable que guarda toda la configuración del observer que hemos hecho previamente
const observer = new IntersectionObserver(observerCallback, observerOptions);

//con esto agregamos todas las secciones sobre las que el observer va a trabajar y le decimos que revise una por una si aparecen o no en pantalla
sections.forEach((sec) => observer.observe(sec)); 