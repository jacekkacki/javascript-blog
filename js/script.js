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
    const article = document.querySelector(".post");
    console.log("article ", article);
    const articleId = article.getAttribute("id");
    console.log("articleId ", articleId);

    /* find title and save to the const */
    const titleArticle = document.querySelector(".post h3").innerHTML;
    console.log("titleArticle ", titleArticle);

    /* create code HTML link and save it */

    const codeHtmlLink =
      "<a href=#" + articleId + "><span>" + titleArticle + "</span></a>";
    console.log("codeHtmlLink ", codeHtmlLink);

    /* put the created HTML code into the list of links in the left column */
  };
  generateTitleLinks();
}
