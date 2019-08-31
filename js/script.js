{
  ("use strict");

  const titleClickHandler = function(event) {
    event.preventDefault();
    console.log("Link was clicked!");
    console.log(event);

    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
      console.log("activeLink ", activeLink);
    }

    /*[DONE] add class 'active' to the clicked link */
    const clickedElement = this;
    console.log("clickedElement:", clickedElement);
    console.log("clickedElement (with plus): " + clickedElement);
    clickedElement.classList.add("active");

    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* get 'href' attribute from the clicked link */

    const articleSelektor = clickedElement.getAttribute("href");
    console.log("href: ", articleSelektor);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelektor);
    console.log("targetArticle :", targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add("active");
  };

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }

  const generateTitleLinks = function() {
    console.log("generateTitleLinks working !");
    /* remove links list from left column */

    const clearLinks = function() {
      const linkTitles = document.querySelector(".titles");
      console.log("linkTitles ", linkTitles);
      linkTitles.innerHTML = "";
    };

    clearLinks();
    /* save article id to the const */

    /* find title and save to the const */

    /* create code HTML link and save it */

    /* put the created HTML code into the list of links in the left column */
    /*
usuń zawartość listy linków w lewej kolumnie,
następnie dla każdego artykułu:
odczytaj jego id i zapisz je do stałej,
znajdź element z tytułem i zapisz jego zawartość do stałej,
na podstawie tych informacji stwórz kod HTML linka i zapisz go do stałej,
wstaw stworzony kod HTML do listy linków w lewej kolumnie.
*/
  };
  generateTitleLinks();
}
