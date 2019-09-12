/* eslint-disable no-irregular-whitespace */
{
  ('use strict');

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLinkRight: Handlebars.compile(document.querySelector('#template-author-link-right').innerHTML)
  };
  /* Create function const */
  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors'
  };

  const titleClickHandler = function(event) {
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);
    /*[DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      console.log('activeLink ', activeLink);
    }
    /*[DONE] add class 'active' to the clicked link */
    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');
    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelektor = clickedElement.getAttribute('href');
    console.log('href: ', articleSelektor);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelektor);
    console.log('targetArticle :', targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  /*Create new title links */
  function generateTitleLinks(customSelector = '') {
    console.log('generateTitleLinks working !');
    console.log('customSelektor ', customSelector);
    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    console.log('titleList ', titleList);
    titleList.innerHTML = '';
    let html = '';
    /* for each article */
    const articles = document.querySelectorAll(
      opt.articleSelector + customSelector
    );
    console.log(
      'opt.articleSelector + customSelector ',
      opt.articleSelector + customSelector
    );
    for (let article of articles) {
      /* find articleId */
      let articleId = article.getAttribute('id');
      console.log('articleId ', articleId);
      /* find title article */
      let articleTitle = article.querySelector(opt.titleSelector).innerHTML;
      console.log('articleTitle ', articleTitle);
      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHtml ', linkHTML);
      /* insert link into html variable */
      html = html + linkHTML;
      titleList.insertAdjacentHTML('beforeend', html);
    }
    titleList.innerHTML = html;
    /* Add event listener */
    const links = document.querySelectorAll('.titles a');
    console.log('links ', links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {max: '0', min:'999999'};
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);generateTags;
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opt.cloudClassCount + 1 );
    let classSizes = ['XS','S','M','L','XL'];
    return opt.cloudClassPrefix + classSizes[classNumber -1];
  }

  /* Generate tag links */
  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsList = article.querySelector(opt.articleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags ', articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray ', articleTagsArray);
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag ', tag);
        /* generate HTML of the link */
        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);
        console.log('linkHTML ', linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        console.log('html ', html);
        tagsList.insertAdjacentHTML('beforeend', html + '  ');
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
          console.log('allTags ', allTags);
        } else {
          allTags[tag]++;
          console.log('allTags ', allTags);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opt.tagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);
    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};
    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and it to allTagsHTML */
      console.log('tag ', tag);
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
      const linkHTMLData = (allTagsData);
      const linkHTML = templates.tagCloudLink(linkHTMLData);
      console.log('tagCloudLinkHTML: ', linkHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
    }
    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData ', allTagsData);
  }

  generateTags();

  /* function tag click handler */
  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement ', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href ', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag ', tag);
    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('tagsActive ', tagsActive);
    /* START LOOP: for each active tag link */
    for (let tagActiveLink of tagsActive) {
      /* remove class active */
      tagActiveLink.classList.remove('active');
    }  /* END LOOP: for each active tag link */ 
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagsLinkHref = clickedElement.querySelectorAll('href' == href);
    console.log('tagsLinkHref ',tagsLinkHref);
    /* START LOOP: for each found tag link */
    for (let foundTag of tagsLinkHref) {
      /* add class active */
      foundTag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll('.post-tags a, .tags a');
    console.log('tags ',tags);
    /* START LOOP: for each link */
    for (let tagLink of tags) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('');
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  /* Generate authors */
  function generateAuthors() {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    /* START LOOP: for every article: */
    for (let article of articles){
      /* find authors wrapper */
      const authorList = article.querySelector(opt.articleAuthorSelector);
      console.log('authorList ', authorList);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log('articleAuthor ', articleAuthor);
      /* generate HTML of the link */
      const linkHTMLData = {author: articleAuthor};
      const linkHTML = templates.authorLink(linkHTMLData);
      //    const linkAuthor = '<a href="#' + articleAuthor + '">' + articleAuthor + '</a>';
      console.log('linkAuthor ', linkHTML);
      /* NEW */
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html ', html);
      authorList.insertAdjacentHTML('beforeend', html + '  ');
      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(articleAuthor)){
        /* [NEW] add generated code to allTags array */
        allAuthors[articleAuthor] = 1;
        console.log('allAuthors ', allAuthors);
      } else {
        allAuthors[articleAuthor]++;
        console.log('allAuthors ', allAuthors);
      }
      /* [NEW] find list of tags in right column */
      const authorListRight = document.querySelector(opt.authorsListSelector);
      /* [NEW] create object allAuthorsData for handsbar */
      const allAuthorsData = {authors: []};
      /* [NEW] START LOOP: for each author in allAuthors: */
      for(let author in allAuthors){
        /* [NEW] generate code link authorListRight */
        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author]
        });
        /* [NEW] END LOOP: for each author in allAuthors: */
      }
      /* [NEW] add html from allAuthorsHTML to authorListRight */
      authorListRight.innerHTML = templates.authorLinkRight(allAuthorsData);
      /* insert HTML of all the links into the tags wrapper */
      authorList.innerHTML = html;
      /* END LOOP: for each author */
    }
    /* END LOOP: for every authors: */
  }

  generateAuthors();
  
  /* function author click handler */
  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement ', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href ', href);
    /* make a new constant "author" and extract # from the "href" constant */
    const author = href.replace('#', '');
    console.log('author ', author);
    /* find all author links with class active */
    const authorsActive = document.querySelectorAll('a.active[href^="#"]');
    console.log('authorsActive ', authorsActive);
    /* START LOOP: for each active author link */
    for (let authorActiveLink of authorsActive) {
      /* remove class active */
      authorActiveLink.classList.remove('active');
    }  /* END LOOP: for each active author link */ 
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorsLinkHref = clickedElement.querySelectorAll('href' == href);
    console.log('authorsLinkHref ',authorsLinkHref);
    /* START LOOP: for each found author link */
    for (let foundAuthor of authorsLinkHref) {
      /* add class active */
      foundAuthor.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to author */
    const authors = document.querySelectorAll('.post-author a, .authors a');
    console.log('authors ',authors);
    /* START LOOP: for each link */
    for (let authorLink of authors) {
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      console.log('');
      /* END LOOP: for each link */
    }
  }
  
  addClickListenersToAuthors();

}
