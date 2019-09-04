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

  /* Create variables */
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  /*Create new title links */
  const generateTitleLinks = function() {
    console.log("generateTitleLinks working !");
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log("titleList ", titleList);
    titleList.innerHTML = "";

    let html = "";
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      /* find articleId */
      let articleId = article.getAttribute("id");
      console.log("articleId ", articleId);
      /* find title article */
      let titleArticle = article.querySelector(optTitleSelector).innerHTML;
      console.log("titleArticle ", titleArticle);
      /* create HTML of the link */
      let linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        titleArticle +
        "</span></a></li>";
      console.log("linkHtml ", linkHTML);
      /* insert link into html variable */
      html = html + linkHTML;
      titleList.insertAdjacentHTML("beforeend", html);
    }
    titleList.innerHTML = html;
    /* Add event listener */
    const links = document.querySelectorAll(".titles a");
    console.log("links ", links);

    for (let link of links) {
      link.addEventListener("click", titleClickHandler);
    }
  };
  generateTitleLinks();
}
