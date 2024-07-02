function printError(err, msg) {
    if (msg !== undefined) {
        console.log("%c** " + msg + " **", 'background:orange;color:#fff');
    }
    console.log("%cERROR: " + err.name + "\n" + err.stack, "color:red");
  }
  
  function printWarn(err, msg) {
    if (msg !== undefined) {
        console.log("%c* " + msg + " *", 'background:orange;color:#fff');
    }
    console.log("%cWARN: " + err.name + "\n" + err.stack, "color:yellow");
  }
  
  function printInfo(msg) {
    console.log("%cINFO: " + msg, "background:blue;color:#fff");
  }


/* -------------------------------------------------------------------------- */
/*                    Initialize pageVariables empty object                   */
/* -------------------------------------------------------------------------- */
const pageVariables = {};

/* -------------------------------------------------------------------------- */
/*                         Definer viewport størrelser                        */
/* -------------------------------------------------------------------------- */
const viewportSizes = {
    mobileMaxWidth: 727,
    tabletMaxWidth: 767,
    desktopMaxWidth: 1280,
};
  /* -------------------------------------------------------------------------- */
  /*                   Definer brugte kateogrier for artikler                   */
  /* -------------------------------------------------------------------------- */
  const pageCategories = [
    "/artikler/kategori/nyheder",
    "/artikler/kategori/aktier",
    "/artikler/kategori/skat",
    "/artikler/kategori/budgeter",
    "/artikler/kategori/spare-hacks"
  ];
  /* -------------------------------------------------------------------------- */
  /*                   Definer IAB sektioner for forskellige kategorier         */
  /* -------------------------------------------------------------------------- */
  const iabSektioner = {
    nyheder: "IAB12",
    økonomi: "IAB13-3",
    aktier: "IAB13-11",
    skat: "IAB13-12",
    budgeter: "IAB13-4",
    "spare-hacks": "IAB13",
  };
/* -------------------------------------------------------------------------- */
/*                           Definer udelukket indhold                        */
/* -------------------------------------------------------------------------- */
  const restrictedWords = [
    { encoded: "c2V4", decoded: "sex" },
    { encoded: "b3JnYXNtZQ==", decoded: "orgasme" },
    { encoded: "cG9ybg==", decoded: "porn" },
    { encoded: "ZXJvdGlr", decoded: "erotik" },
    { encoded: "ZXNjb3J0", decoded: "escort" },
    { encoded: "Ymxvd2pvYg==", decoded: "blowjob" },
    { encoded: "ZGlsZG8=", decoded: "dildo" },
    { encoded: "ZGlsbGVy", decoded: "diller" },
    { encoded: "YnJ5c3Rlcg==", decoded: "bryster" },
    { encoded: "bnVkaXN0", decoded: "nudist" },
    { encoded: "cGVuaXM=", decoded: "penis" },
    { encoded: "c3dpbmdlcg==", decoded: "swinger" },
    { encoded: "b25hbmVyZQ==", decoded: "onanere" },
    { encoded: "cGlr", decoded: "pik" },
    { encoded: "ZGlja3BpY3M=", decoded: "dickpics" },
  ];
/* -------------------------------------------------------------------------- */
/*                              Definer Værdier                               */
/* -------------------------------------------------------------------------- */
var googletag, pbjs, myPrebidTimeout, prebidEnabled, tabletMinViewportWidth, desktopMinViewportWidth, is_mobile, is_desktop, connectionNG, slot_Mobile_Article_1, slot_Mobile_Article_2, slot_Mobile_Article_3, slot_Mobile_Article_4, slot_Mobile_Article_5, slot_Mobile_Article_6, slot_Mobile_Article_7, slot_Mobile_Article_8, slot_Leaderboard_1, slot_Leaderboard_2, slot_Leaderboard_3, slot_Square_1, slot_InText_1, slot_InText_2, slot_InText_3, slot_InText_4, slot_InText_5, slot_160x600_L, slot_160x600_R, slot_1x1, slot_Mobile_Square_1, slot_Mobile_Square_2, slot_Mobile_Square_3, slot_Mobile_Anchor, adslotStates, deviceClassification, tcString;
const PREBID_TIMEOUT = 1500;
const contentAreaMaxWidth = 1280;
const usingIabCMP = true;
const cookieCMP = "GAM";

window.ID5EspConfig = {
  partnerId: 1254
};

/* -------------------------------------------------------------------------- */
/*                   Definer hvor ads skal placeres på siden                  */
/* -------------------------------------------------------------------------- */
const selectors = {
  paragraphCSS3:
    "div.articleText > :not(:empty):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(p:has(strong))",
  paragraphCSS2: "div.articleText > p",
};
 /* -------------------------------------------------------------------------- */
/*                 Indhent viewport størrelse width og height                 */
/* -------------------------------------------------------------------------- */
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
 /* -------------------------------------------------------------------------- */
  /*            Define which device is in use based on viewport width           */
  /* -------------------------------------------------------------------------- */
  if (viewportWidth > viewportSizes.tabletMaxWidth) {
    deviceInUse = "desktop";
  } else if (viewportWidth > viewportSizes.mobileMaxWidth) {
    deviceInUse = "tablet";
  } else {
    deviceInUse = "mobile";
  }
  const isMobile = deviceInUse === "mobile";
  const isTablet = deviceInUse === "tablet";
  const isDesktop = deviceInUse === "desktop";



  pageVariables["viewport-width"] = viewportWidth;
  pageVariables["viewport-height"] = viewportHeight;  
tabletMinViewportWidth = viewportSizes.mobileMaxWidth; + 1;
desktopMinViewportWidth = viewportSizes.tabletMaxWidth + 1;
deviceClassification = pageVariables["viewport-width"] >= desktopMinViewportWidth ? "desktop" : pageVariables["viewport-width"] >= tabletMinViewportWidth ? "tablet" : "mobile";
is_mobile = pageVariables["viewport-width"] <= viewportSizes.mobileMaxWidth;
is_desktop = !is_mobile;
/* -------------------------------------------------------------------------- */
/*                                     ADS                                    */
/* -------------------------------------------------------------------------- */
const adform = "adform";
const criteo = "criteo";
const improvedigital = "improvedigital";
const improvedigitalPublisherId = 2109;
const pageName = "PengehjoernetDK";
const adId = '49662453';
var desktop_delta = 350;
var mobile_delta = 650;
var mobile_article_delta = 300;

const ads = {
    'div-Leaderboard_1': { adform: 1905693, type: "desktop", sizes: getAdSizes("topboard"), gpid: '/49662453/PengehjoernetDK/Leaderboard_1', slot: slot_Leaderboard_1, offset: desktop_delta },
    'div-Leaderboard_2': { adform: 1905711, type: "desktop", sizes: getAdSizes("board"), gpid: '/49662453/PengehjoernetDK/Leaderboard_2', slot: slot_Leaderboard_2, offset: desktop_delta },
    'div-Leaderboard_3': { adform: 1941298, type: "desktop", sizes: getAdSizes("board"), gpid: '/49662453/PengehjoernetDK/Leaderboard_3', slot: slot_Leaderboard_3, offset: desktop_delta },
    'div-Square_1': { adform: 1905694, type: "desktop", sizes: getAdSizes("infeed"), gpid: '/49662453/PengehjoernetDK/Square_1', slot: slot_Square_1, offset: desktop_delta },
    'div-InText_1': { adform: 1905704, type: "desktop", sizes: getAdSizes("intext"), gpid: '/49662453/PengehjoernetDK/InText_1', slot: slot_InText_1, offset: desktop_delta, paragraph: 5 },
    'div-InText_2': { adform: 1905705, type: "desktop", sizes: getAdSizes("intext"), gpid: '/49662453/PengehjoernetDK/InText_2', slot: slot_InText_2, offset: desktop_delta },
    'div-InText_3': { adform: 1905708, type: "desktop", sizes: getAdSizes("intext"), gpid: '/49662453/PengehjoernetDK/InText_3', slot: slot_InText_3, offset: desktop_delta, paragraph: 15 },
    'div-InText_4': { adform: 1905706, type: "desktop", sizes: getAdSizes("intext"), gpid: '/49662453/PengehjoernetDK/InText_4', slot: slot_InText_4, offset: desktop_delta, paragraph: 20 },
    'div-InText_5': { adform: 1905707, type: "desktop", sizes: getAdSizes("intext"), gpid: '/49662453/PengehjoernetDK/InText_5', slot: slot_InText_5, offset: desktop_delta, paragraph: 25 },
    'div-160x600_L': { adform: 1905702, type: "desktop", sizes: getAdSizes("skyscraper"), gpid: '/49662453/PengehjoernetDK/160x600_L', slot: slot_160x600_L, offset: desktop_delta },
    'div-160x600_R': { adform: 1905703, type: "desktop", sizes: getAdSizes("skyscraper"), gpid: '/49662453/PengehjoernetDK/160x600_R', slot: slot_160x600_R, offset: desktop_delta },
    'div-Mobile_Article_1': { adform: 1905695, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_1', slot: slot_Mobile_Article_1, offset: mobile_article_delta, paragraph: 2 },
    'div-Mobile_Article_2': { adform: 1905696, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_2', slot: slot_Mobile_Article_2, offset: mobile_article_delta, paragraph: 7 },
    'div-Mobile_Article_3': { adform: 1905698, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_3', slot: slot_Mobile_Article_3, offset: mobile_article_delta, paragraph: 12 },
    'div-Mobile_Article_4': { adform: 1905697, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_4', slot: slot_Mobile_Article_4, offset: mobile_article_delta, paragraph: 17 },
    'div-Mobile_Article_5': { adform: 1905699, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_5', slot: slot_Mobile_Article_5, offset: mobile_article_delta, paragraph: 22 },
    'div-Mobile_Article_6': { adform: 1905700, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_6', slot: slot_Mobile_Article_6, offset: mobile_article_delta, paragraph: 27 },
    'div-Mobile_Article_7': { adform: 1905710, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_7', slot: slot_Mobile_Article_7, offset: mobile_article_delta, paragraph: 32 },
    'div-Mobile_Article_8': { adform: 1905709, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Article_8', slot: slot_Mobile_Article_8, offset: mobile_article_delta, paragraph: 37 },
    'div-Mobile_Square_1': { adform: 1905701, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Square_1', slot: slot_Mobile_Square_1, offset: mobile_delta },
    'div-Mobile_Square_2': { adform: 1925500, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Square_2', slot: slot_Mobile_Square_2, offset: mobile_delta },
    'div-Mobile_Square_3': { adform: 1941366, type: "mobile", sizes: getAdSizes("mobile"), gpid: '/49662453/PengehjoernetDK/Mobile_Square_3', slot: slot_Mobile_Square_3, offset: mobile_delta },
    [`gpt_unit_/49662453/${pageName}/Mobile_Anchor_0`]: { adform: 1905712, type: "mobile", sizes: getAdSizes("mobile_anchor"), gpid: '/49662453/PengehjoernetDK/Mobile_Anchor', slot: slot_Mobile_Anchor, offset: mobile_delta }
};


  /* -------------------------------------------------------------------------- */
  /*         See which browser is being used by the user and classify it        */
  /* -------------------------------------------------------------------------- */
const getBrowserName = () => {
    "use strict";
    try {
      const userAgent = navigator.userAgent || navigator.vendor;
      const vendor = navigator.vendor || navigator.userAgent;
      const customWindow = window;
  
      const browserRules = [
        { name: "Opera", condition: () => (!!customWindow.opr && !!customWindow.addons) || !!customWindow.opera || userAgent.includes("OPR/") },
        { name: "FacebookInApp", condition: () => userAgent.includes("FBAN") || userAgent.includes("FBAV") },
        { name: "Instagram", condition: () => userAgent.includes("Instagram") },
        { name: "Android", condition: () => userAgent.includes("android") },
        { name: "Firefox", condition: () => userAgent.includes("Firefox") },
        { name: "Samsung", condition: () => userAgent.includes("SamsungBrowser") },
        { name: "Safari", condition: () => vendor.includes("Apple") },
        { name: "Edge", condition: () => typeof CSS !== "undefined" && CSS.supports("(-ms-ime-align:auto)") },
        { name: "Chrome", condition: () => vendor.includes("Google") },
      ];
  
      for (const rule of browserRules) {
        if (rule.condition()) {
          return rule.name;
        }
      }
  
      // Default to Minor browser
      return "Minor";
  
    } catch (err) {
      console.error(err, "Failed to detect browser");
      return "Minor";
    }
};
  console.log("Browser in use", getBrowserName());
let browserName = getBrowserName();



/* Change ad sizes STEP */
function getAdSizes(format, extendedSizes = []) {
    console.assert(pageVariables["viewport-width"] !== undefined, "pageVariables['viewport-width'] not defined before calling getAdSizes()");

    const baseSizes = {
        infeed: [[300, 600], [300, 250]],
        topboard: [[728, 90], [930, 180], [970, 66], [970, 90], [970, 250], [980, 120]],
        board: [[728, 90], [930, 180], [930, 600], [970, 66], [970, 90], [970, 250], [980, 120]],
        intext: [[300, 250], [336, 280], [250, 250], [250, 360]],
        mobile: [[300, 50], [300, 100], [300, 250], [320, 50], [320, 80], [320, 100], [320, 160], [320, 180], [320, 250], [320, 320], [336, 280]],
        pixel: [[1, 1], [1, 2]],
        skyscraper: [[160, 600]],
        anchor: [[728, 90], [970, 90], [980, 90], [990, 90]],
        mobile_anchor: [[320, 100], [320, 50]],
        default: [[300, 250]]
    };

    const deviceSizes = {
        desktop: {
            topboard: baseSizes.topboard,
            board: baseSizes.board,
            intext: baseSizes.intext.concat([[728, 90], [930, 180]]),
            infeed: baseSizes.infeed,
            skyscraper: baseSizes.skyscraper,
            anchor: baseSizes.anchor,
            pixel: baseSizes.pixel
        },
        mobile: {
            topboard: [],
            board: [],
            intext: [],
            mobile: baseSizes.mobile.concat([[360, 300], [360, 360]]),
            mobile320x480: baseSizes.mobile.concat([[320, 400], [320, 480], [360, 300], [360, 360]]),
            infeed: [],
            skyscraper: [],
            anchor: [],
            pixel: baseSizes.pixel
        }
    };

    let result = baseSizes.default;

    if (format.toLowerCase() in deviceSizes[is_desktop ? "desktop" : "mobile"]) {
        result = deviceSizes[is_desktop ? "desktop" : "mobile"][format.toLowerCase()];
    } else if (format.toLowerCase() in baseSizes) {
        result = baseSizes[format.toLowerCase()];
    }

    return extendedSizes.length > 0 ? result.concat(extendedSizes) : result;
}



function getFluidAdSizes(format) {
  var extendedSizes = [
      "fluid"
  ];
  return getAdSizes(format, extendedSizes);
}

function getResponsiveAdSizes(format) {
  var extendedSizes = [
      [1, 1]
  ];
  return getAdSizes(format, extendedSizes);
}

function getResponsiveFluidAdSizes(format) {
  var extendedSizes = [
      "fluid", [1, 1]
  ];
  return getAdSizes(format, extendedSizes);
}


Element.prototype.setBefore = function(element) {
  "use strict";
  var inserted = false;
  try {
      element.parentNode.insertBefore(this, element);
      inserted = true;
  } catch (err) {
      printError(err, "Failed to setBefore Container: " + (this.id || this.tagName));
  }
  return inserted;
};

Element.prototype.setAfter = function(element) {
  "use strict";
  var inserted = false;
  try {
      element.parentNode.insertBefore(this, element.nextSibling);
      inserted = true;
  } catch (err) {
      printError(err, "Failed to setAfter Container: " + (this.id || this.tagName));
  }
  return inserted;
};

/**
* Counts the number of paragraphs.
*
* @return     {number}  Number of paragraphs.
*/
function countParagraphs() {
  "use strict";
  try {
      return document.querySelectorAll(selectors.paragraphCSS3).length;
  } catch (err) {
      if (err.name === "SyntaxError") {
          printWarn(err, "Browser-support handling: Falling back to simple query selector in countParagraphs function");
          return document.querySelectorAll(paragraphCSS2Selector).length;
      }
  }
}

/**
* Prepends an element according to a paragraph like element
*
* @param      {number}   pNum     The preferred paragraph number
* @param      {number}   pNumMin  The minimum paragraph number
* @return     {boolean}  true, if the element could be inserted, else false
*/
Element.prototype.setBeforeParagraph = function(pNum, pNumMin) {
  "use strict";
  var nPar = countParagraphs();
  pNumMin = (typeof pNumMin !== 'undefined') ? pNumMin : pNum;
  var inserted = false;
  try {
      if (nPar >= pNumMin) {
          var paragraph;
          try {
              if (nPar >= pNum) {
                  paragraph = document.querySelectorAll(selector.paragraphCSS3)[pNum - 1];
              } else {
                  paragraph = document.querySelectorAll(selector.paragraphCSS3)[nPar - 1];
              }
          } catch (err) {
              if (nPar >= pNum) {
                  paragraph = document.querySelectorAll(selector.paragraphCSS2)[pNum - 1];
              } else {
                  paragraph = document.querySelectorAll(selector.paragraphCSS2)[nPar - 1];
              }
          }
    /*
          if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("image") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
              paragraph = paragraph.parentNode.parentNode;
          }*/
          paragraph.parentNode.insertBefore(this, paragraph);
          inserted = true;
      } else {
          printInfo("Not enough paragraphs to insert " + (this.id || this.tagName));
      }
  } catch (err) {
      printError(err, "Failed to set before paragraph");
  }
  return inserted;
};

/**
* Appends an element according to a paragraph like element
*
* @param      {number}   pNum     The preferred paragraph number
* @param      {number}   pNumMin  The minimum paragraph number
* @return     {boolean}  true, if the element could be inserted, else false
*/
Element.prototype.setAfterParagraph = function(pNum, pNumMin) {
  "use strict";
  var nPar = countParagraphs();
  pNumMin = (typeof pNumMin !== 'undefined') ? pNumMin : pNum;
  var inserted = false;
  try {
      if (nPar >= pNumMin) {
          var paragraph;
          try {
              if (nPar >= pNum) {
                  paragraph = document.querySelectorAll(selector.paragraphCSS3)[pNum - 1];
              } else {
                  paragraph = document.querySelectorAll(selector.paragraphCSS3)[nPar - 1];
              }
          } catch (err) {
              if (nPar >= pNum) {
                  paragraph = document.querySelectorAll(selector.paragraphCSS2)[pNum - 1];
              } else {
                  paragraph = document.querySelectorAll(selector.paragraphCSS2)[nPar - 1];
              }
          }
    /*
          if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
              paragraph = paragraph.parentNode.parentNode;
          }
    */
          paragraph.parentNode.insertBefore(this, paragraph.nextSibling);
          inserted = true;
      } else {
          printInfo("Not enough paragraphs to insert " + (this.id || this.tagName));
      }
  } catch (err) {
      printError(err, "Failed to set after paragraph");
  }
  return inserted;
};


function isAdunitWithinYOffset(adunitCode, yOffset) {
  "use strict";

  function isVisible(el) {
      try {
          return !!el && (!!el.offsetParent || ((el.style.position === 'fixed') && (el.style.display !== 'none') && (window.getComputedStyle(el).display !== 'none'))) && (el.style.visibility !== 'hidden') && (el.getBoundingClientRect().left >= 0) && (el.getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth));
      } catch (err) {
          printWarn(err, "Falling back to legacy browser JS");
          return !!el && (!!el.offsetParent || ((el.style.position === 'fixed') && (el.style.display !== 'none'))) && (el.style.visibility !== 'hidden') && (el.getBoundingClientRect().left >= 0) && (el.getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth));
      }
  }
  try {
      var scrollingTop, viewHeight, bannerTop, lenght, bannerDiv;
      bannerDiv = document.getElementById(adunitCode);
      if (isVisible(bannerDiv)) {
          scrollingTop = document.body.scrollTop + document.documentElement.scrollTop;
          viewHeight = document.documentElement.clientHeight;
          bannerTop = bannerDiv.getBoundingClientRect().top + window.scrollY;
          return (bannerTop - (scrollingTop + viewHeight) - yOffset <= 0);
      } else {
          return false;
      }
  } catch (err) {
      printError(err, "Failed to check yoffset");
      return false;
  }
}

function isParagraphWithinYOffset(pNum, yOffset) {
  "use strict";
  var nPar = countParagraphs();
  if (pNum < 0) { /* looking up from bottom using negative index */
      pNum = nPar + pNum + 1;
  }
  try {
      if (nPar >= pNum) {
          var scrollingTop, viewHeight, paragraphTop, lenght, paragraph;
          try {
              paragraph = document.querySelectorAll(selector.paragraphCSS3)[pNum - 1];
          } catch (err) {
              paragraph = document.querySelectorAll(selector.paragraphCSS2)[pNum - 1];
          }
          if ((paragraph.className.indexOf("instagram") > -1) || (paragraph.className.indexOf("twitter") > -1) || (paragraph.className.indexOf("facebook") > -1) || (paragraph.className.indexOf("video") > -1) || (paragraph.className.indexOf("image") > -1) || (paragraph.className.indexOf("related-articles") > -1)) {
              paragraph = paragraph.parentNode.parentNode;
          }
          scrollingTop = document.body.scrollTop + document.documentElement.scrollTop;
          viewHeight = document.documentElement.clientHeight;
          paragraphTop = paragraph.getBoundingClientRect().top + window.scrollY;
          return (paragraphTop - (scrollingTop + viewHeight) - yOffset <= 0);
      } else {
          return false;
      }
  } catch (err) {
      printError(err, "Failed to detecide if paragraph within offset");
      return false;
  }
}

function getConnectionEffectiveType() {
  "use strict";
  try {
      var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;
      if (connection) {
          return connection.effectiveType;
      }
      return "unknown";
  } catch (err) {
      printWarn(err, "Could not detect connection effective type");
      return "unknown";
  }
}

connectionNG = getConnectionEffectiveType();

  /* -------------------------------------------------------------------------- */
  /*    Funktion til at hente og validere den kanoniske URL for aktuelle side   */
  /* -------------------------------------------------------------------------- */
  const getCanonicalURL = () => {
    const isWebUrlValid = (url) => /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(url);
  
    const canonicalLink = !window.evaluate || !window.XPathResult 
      ? document.querySelector('link[rel~="canonical"]') 
      : document.evaluate("//link[@rel='canonical']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
    const canonicalURL = canonicalLink ? canonicalLink.getAttribute("href") : window.location.href;
  
    return isWebUrlValid(canonicalURL) ? canonicalURL : window.location.href;
  };

  /* -------------------------------------------------------------------------- */
  /*          Funktion til at udtrække base-stien fra den kanoniske URL         */
  /* -------------------------------------------------------------------------- */
  const extractBasePath = () => {
    const canonicalUrl = new URL(getCanonicalURL());
    let basePath = canonicalUrl.pathname;
    return basePath.length > 1 && basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  };
  // Opdatering af pageVariables med den kanoniske URL og base-sti
  pageVariables["canonical-url"] = getCanonicalURL();
  pageVariables["pathbasename"] = extractBasePath();



function is404Page() {
  "use strict";
  try {
      return (document.querySelector("title").innerText === '404: This page could not be found.') ? "Yes" : "No";
  } catch (err) {
      return false;
  }
}
pageVariables["404"] = is404Page();

  /* -------------------------------------------------------------------------- */
  /*     Funktion til at bestemme sektionen/kategorien for den aktuelle side    */
  /* -------------------------------------------------------------------------- */
const getSubsectionCategory = () => {
    console.assert(pageVariables["pathbasename"], "pageVariables['pathbasename'] not defined before calling getSubsectionCategory()");
    // Debugging logs
    console.log("Path Basename in getSubsectionCategory:", pageVariables["pathbasename"]);
  
    if (pageVariables["pathbasename"] === "/") {
      console.log("Returning frontpage because pathbasename is /");
      return "frontpage";
    }
    // Hvis stien matcher en kendt sektion, returner "subsection-frontpage"
    if (pageCategories.includes(pageVariables["pathbasename"])) {
      return "subsection-frontpage";
    }
    // Tjek meta-tag for at afgøre om siden er en artikel
    const pageTypeMetaTag = document.querySelector('meta[property~="og:type"]');
    // Returner "articlepage" hvis meta-tag er til stede og angiver "article", ellers "basepage"
    const result = pageTypeMetaTag && pageTypeMetaTag.content === "article" ? "articlepage" : "basepage";
    return result;
  };
  
  // Opdatering af pageVariables med den bestemte sektion/kategori
  pageVariables["subsection-category"] = getSubsectionCategory();
  console.log("Final Subsection Category:", pageVariables["subsection-category"]);
  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme kategorien baseret på subsection-kategorien    */
  /* -------------------------------------------------------------------------- */
  const getNewsCategory = () => {
    // Sikrer at "subsection-category" er defineret
    console.assert(pageVariables["subsection-category"] !== undefined, "pageVariables['subsection-category'] not defined before calling getNewsCategory()");
    
    const subsectionCategory = pageVariables["subsection-category"];
    
    const categoryRules = [
      {
        name: "finance",
        condition: () => subsectionCategory === "articlepage" && document.querySelector('meta[property~="article:section"]')?.content.toLowerCase() === "finance"
      },
      {
        name: "finance",
        condition: () => subsectionCategory === "subsection-frontpage"
      },
      {
        name: "economy",
        condition: () => true // Default rule
      }
    ];
    
    for (const rule of categoryRules) {
      if (rule.condition()) {
        return rule.name;
      }
    }
  };
  // Opdatering af pageVariables med den bestemte nyhedskategori
  pageVariables["news-category"] = getNewsCategory();
  console.log("News Category:", pageVariables["news-category"]);


  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme IAB sektionen baseret på nyhedskategorien      */
  /* -------------------------------------------------------------------------- */
  const getSectionIAB = (section) => {
    "use strict";
    return iabSektioner.hasOwnProperty(section) ? iab[section] : "IAB13";
  };
  pageVariables["sectioncat"] = getSectionIAB(pageVariables["news-category"]);
  console.log("IAB Section:", pageVariables["sectioncat"]);

  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme miljøet (Live, Test, Specs, NoAds) baseret    */
  /*    på URL'en for den aktuelle side                                        */
  /* -------------------------------------------------------------------------- */
  const getEnvironment = () => {
    console.assert(
      pageVariables["pathbasename"] !== undefined,
      "pageVariables['pathbasename'] not defined before calling getEnvironment()"
    );
  
    if (pageVariables["404"] === "Yes") {
      return "NoAds";
    } else if (window.location.href.includes("annonce-test")) {
      return "Test";
    } else if (window.location.href.includes("annonce-specs")) {
      return "Specs";
    } else {
      return "Live";
    }
  };
  pageVariables["environment"] = getEnvironment();
  
  pageVariables["adform-keyvalues"] =
    "category:" +
    pageVariables["news-category"] +
    ",section:" +
    pageVariables["subsection-category"] +
    ",environment:" +
    pageVariables["environment"];
  
  pageVariables["improvedigital-keyvalues"] = {
    sectioncat: [pageVariables["sectioncat"]],
  };

  console.log("Environment:", pageVariables["environment"]);
  console.log("Adform Key Values:", pageVariables["adform-keyvalues"]);
  console.log("ImproveDigital Key Values:", pageVariables["improvedigital-keyvalues"]);
  console.log("Page Variables collected 33", pageVariables);

  /* -------------------------------------------------------------------------- */
  /*    Funktion til at bestemme om indholdet er begrænset og derfor ikke må    */
  /*    vise reklamer                                                           */
  /* -------------------------------------------------------------------------- */
  const testIsRestrictedContent = () => {
    "use strict";
    console.assert(
      pageVariables["pathbasename"] !== undefined,
      "pageVariables['pathbasename'] not defined before calling testIsRestrictedContent()"
    );
  
    if (pageVariables["404"] === "Yes") {
      return "Yes";
    }
  
    const pathBasenameLower = pageVariables["pathbasename"].toLowerCase();
   // Looper igennem alle ord i restrictedWords
    for (const word of restrictedWords) {
      if (pathBasenameLower.includes(word.decoded)) {
        console.log(`Restricted content detected: ${word.decoded}`);
        return "Yes";
      }
    }
    return "No";
  };
  
  pageVariables["restricted"] = testIsRestrictedContent();
  console.log("Restricted content:", pageVariables["restricted"]);

googletag = googletag || {};
googletag.cmd = googletag.cmd || [];



pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.bidderSettings = {
  standard: {
      allowAlternateBidderCodes: true,
      allowedAlternateBidderCodes: ["*"],
      storageAllowed: true
  },
  adform: {
      bidCpmAdjustment: function(bidCpm) {
          "use strict";
          return bidCpm * 0.9;
      },
      allowAlternateBidderCodes: true,
      allowedAlternateBidderCodes: ["*"],
      storageAllowed: true
  },
  criteo: {
      allowAlternateBidderCodes: true,
      allowedAlternateBidderCodes: ["*"],
      storageAllowed: true
  },
  improvedigital: { //NET CPM
      allowAlternateBidderCodes: true,
      allowedAlternateBidderCodes: ["*"],
      storageAllowed: true
  }
};


prebidEnabled = (!(connectionNG === "slow-2g" || connectionNG === "2g"));



function getBidderID(divID, bidderName) {
    if (bidderName === criteo) {
        return divID.replace("div-", "Pengehjoernet.dk ").replace("_", " ");
    } else if (ads[divID] && ads[divID][adform]) {
        return ads[divID][adform];
    } else {
        printInfo(`ERROR: No ID for ${divID} and ${bidderName}`);
        return null;
    }
}

pbjs.que.push(function() { 
    "use strict";

    if (prebidEnabled) {
        try {
            ["adform", "criteo", "improvedigital"].forEach(function(bidder) {
                pbjs.setBidderConfig({
                    bidders: [bidder],
                    config: {
                        "schain": {
                            "validation": "relaxed",
                            "config": {
                                "ver": "1.0",
                                "complete": 1,
                                "nodes": [{
                                    "asi": "mgdk.dk",
                                    "sid": "MGDK-00000000001",
                                    "hp": 1
                                }]
                            }
                        }
                    }
                });
            });
        } catch (err) {
            printError(err, "in setBidderConfig");
        }

        pbjs.setConfig({
            "schain": {
                "validation": "strict",
                "config": {
                    "ver": "1.0",
                    "complete": 1,
                    "nodes": [{
                        "asi": "mgdk.dk",
                        "sid": "MGDK-00000000001",
                        "hp": 1
                    }]
                }
            },
            gptPreAuction: {
                enabled: true,
                useDefaultPreAuction: true
            },
            bidderSequence: "fixed",
            gvlMapping: {
                "adform": 50,
                "criteo": 91,
                "improvedigital": 253,
                "criteoId": 91,
                "id5id": 131,
                "teadsId": 132,
                "unifiedId": 21,
                "adtelligentId": 410,
                "uid2": 21
            },
            priceGranularity: {
                'buckets': [{
                    'min': 1,
                    'max': 50,
                    'increment': 0.10
                }, {
                    'min': 50,
                    'max': 150,
                    'increment': 1.00
                }, {
                    'min': 150,
                    'max': 300,
                    'increment': 5.00
                }, {
                    'min': 300,
                    'max': 500,
                    'increment': 10.00
                }, {
                    'min': 500,
                    'max': 1000,
                    'increment': 50.00
                }, {
                    'min': 1000,
                    'max': 2000,
                    'increment': 100.00
                }]
            },
            currency: {
                "adServerCurrency": "DKK",
                "rates": {
                    "USD": { "DKK": 7.00 },
                    "EUR": { "DKK": 7.45 }
                },
                "bidderCurrencyDefault": {
                    "adform": "DKK",
                    "criteo": "DKK",
                    "improvedigital": "DKK"
                }
            },
            userSync: {
                filterSettings: {
                    iframe: { bidders: '*', filter: 'include' },
                    image: { bidders: '*', filter: 'include' }
                },
                syncDelay: 3000,
                iframeEnabled: true,
                syncsPerBidder: 0,
                aliasSyncEnabled: true,
                syncEnabled: true,
                userIds: [{
                    name: 'sharedId',
                    params: { syncTime: 300 },
                    storage: {
                        name: 'sharedid',
                        type: typeof Storage === "undefined" ? 'cookie' : 'html5',
                        expires: 28
                    },
                }, {
                    name: "criteo",
                }, {
                    name: "unifiedId",
                    params: { url: "//match.adsrvr.org/track/rid?ttd_pid=30s4f6z&fmt=json" },
                    storage: {
                        type: typeof Storage === "undefined" ? 'cookie' : 'html5',
                        name: "pbjs-unifiedid",
                        expires: 60
                    }
                }, {
                    name: "uid2",
                }, {
                    name: 'adtelligent'
                }, {
                    name: 'id5Id',
                    params: { partner: 1254 },
                    storage: {
                        type: 'html5',
                        name: 'id5id',
                        expires: 90,
                        refreshInSeconds: 8 * 3600
                    }
                }, {
                    name: 'teadsId',
                    params: { pubId: 24402 }
                }],
                auctionDelay: 1000
            },
            paapi: {
                enabled: true,
                defaultForSlots: 1
            },
            ...(usingIabCMP ? {
                consentManagement: {
                    gdpr: {
                        cmpApi: 'iab',
                        timeout: 10000,
                        defaultGdprScope: true,
                        allowAuctionWithoutConsent: true,
                        rules: [{
                            purpose: "storage",
                            enforcePurpose: true,
                            enforceVendor: true
                        }, {
                            purpose: "basicAds",
                            enforcePurpose: true,
                            enforceVendor: true
                        }, {
                            purpose: "measurement",
                            enforcePurpose: true,
                            enforceVendor: true
                        }]
                    },
                    usp: {
                        timeout: 500
                    },
                    gpp: {
                        cmpApi: 'iab',
                        timeout: 10000
                    }
                }
            } : {}),
            useBidCache: true,
            enableTIDs: true,
            pageUrl: pageVariables["canonical-url"],
            ortb2: {
                site: {
                    name: "Pengehjørnet.dk",
                    domain: document.domain,
                    cat: ["IAB13-3"],
                    sectioncat: [pageVariables["sectioncat"]],
                    page: pageVariables["canonical-url"],
                    ref: document.referrer,
                    ext: {
                        data: {
                            pageType: (pageVariables["subsection-category"] === "articlepage") ? "article" : (pageVariables["subsection-category"] === "subsection-frontpage") ? "object" : "website",
                            category: pageVariables["news-category"],
                            restricted: pageVariables["restricted"]
                        }
                    }
                }
            }
        });

        var adUnits = [];

        Object.keys(ads).forEach(function(slotId) {
            var slot = ads[slotId];
            var adUnit = {
                code: slotId,
                ortb2Imp: {
                    ext: {
                        gpid: slot.gpid,
                        data: { pbadslot: slot.gpid }
                    }
                },
                mediaTypes: { banner: { sizes: slot.sizes } },
                bids: [{
                    bidder: adform,
                    params: {
                        mid: getBidderID(slotId, adform),
                        url: pageVariables["canonical-url"],
                        mkv: pageVariables["adform-keyvalues"]
                    }
                }]
            };
            adUnits.push(adUnit);
        });

        pbjs.addAdUnits(adUnits);
    }
});



/* tracks if an ad slot has been refreshed or not */
var refreshedMap = {
"div-1x1": false,
  "div-Leaderboard_1": false,
  "div-Leaderboard_2": false,
  "div-Leaderboard_3": false,
  "div-Square_1": false,
  "div-Square_2": false,
  "div-Square_3": false,
  "div-InText_1": false,
  "div-InText_2": false,
  "div-InText_3": false,
  "div-InText_4": false,
  "div-InText_5": false,
  "div-Mobile_Article_1": false,
  "div-Mobile_Article_2": false,
  "div-Mobile_Article_3": false,
  "div-Mobile_Article_4": false,
  "div-Mobile_Article_5": false,
  "div-Mobile_Article_6": false,
  "div-Mobile_Article_7": false,
  "div-Mobile_Article_8": false,
  "div-Mobile_Square_1": false,
  "div-Mobile_Square_2": false,
    "div-Mobile_Square_3": false,
  "gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0": false
};

function refreshAdslot(adslot) {
  "use strict";
  if (pageVariables["environment"] === "NoAds") {
      printInfo("NoAds environment - skipping ad fetch.");
  } else {
      if (adslot !== undefined) {
          //set longer timeouts for below the fold placements
          if (adslot.getSlotElementId().indexOf("_1") === -1) {
              myPrebidTimeout = PREBID_TIMEOUT + 500;
          } else {
              myPrebidTimeout = PREBID_TIMEOUT;
          }
          if (!!googletag.pubadsReady) {
              if (!refreshedMap[adslot.getSlotElementId()]) {
                  var slotId = adslot.getSlotElementId();
                  refreshedMap[slotId] = true;
                  if (prebidEnabled) {
                      try {
                          pbjs.que.push(function() {
                              pbjs.requestBids({
                                  timeout: myPrebidTimeout,
                                  adUnitCodes: [slotId],
                                  bidsBackHandler: function() {
                                      pbjs.setTargetingForGPTAsync([slotId]);
                                      googletag.pubads().refresh([adslot]);
                                  }
                              });
                          });
                      } catch (err) {
                          googletag.pubads().refresh([adslot]);
                          printError(err, "Prebid timeout");
                      }
                  } else {
                      googletag.pubads().refresh([adslot]);
                      printInfo(slotId + " rendered outside prebid");
                  }
              }
          } else {
              var listenForPubadsReady = setInterval(function() {
                  if (!!googletag.pubadsReady) {
                      var slotId = adslot.getSlotElementId();
                      if (!refreshedMap[slotId]) {
                          refreshedMap[slotId] = true;
                          if (prebidEnabled) {
                              try {
                                  pbjs.que.push(function() {
                                      pbjs.requestBids({
                                          timeout: PREBID_TIMEOUT,
                                          adUnitCodes: [slotId],
                                          bidsBackHandler: function() {
                                              pbjs.setTargetingForGPTAsync([slotId]);
                                              googletag.pubads().refresh([adslot]);
                                          }
                                      });
                                  });
                              } catch (err) {
                                  googletag.pubads().refresh([adslot]);
                                  printError(err, "Prebid timeout");
                              }
                          } else {
                              googletag.pubads().refresh([adslot]);
                              printInfo(slotId + " rendered outside prebid");
                          }
                      }
                      clearInterval(listenForPubadsReady);
                  }
              }, 100);
          }
      }
  }
}


if (connectionNG.indexOf("2g") > -1) {
  mobile_delta = 850;
  mobile_article_delta = 450;
} else if (connectionNG.indexOf("3g") > -1) {
  mobile_delta = 750;
  mobile_article_delta = 450;
}

var atfSlots = is_mobile ? ["div-Mobile_Article_1"] : ["div-Leaderboard_1"];

function isEvenDiv(divID) {
  var matches = divID.match(/(\d*[02468])/);
  return !!matches;
}

function createMobileArticleBanner(num) {
  var banner_div, banner_div_id;
  if ((pageVariables["environment"] !== "NoAds") && (pageVariables["environment"] !== "LimmitedAds") && is_mobile) {
      banner_div_id = "div-Mobile_Article_" + num.toString();
      if (!document.getElementById(banner_div_id)) {
          banner_div = document.createElement("div");
          banner_div.id = banner_div_id;
          banner_div.style.textAlign = "center";
          //banner_div.className = "banner";
          banner_div.className += " mobile-article-banner";
          banner_div.style.marginBottom = "1em";
          banner_div.style.marginTop = "0.5em";
          banner_div.style.marginLeft = "-1.5rem !important";
      } else {
          banner_div = document.getElementById(banner_div_id);
      }
  }
  return banner_div;
}

function detectWallpaper() {
  var result = false;
  if (document.getElementsByTagName("HTML").length > 0 && (document.getElementsByTagName("HTML")[0].className.indexOf("wallpaper") > -1 || document.getElementsByTagName("HTML")[0].className.indexOf("skin") > -1)) { 
      result = true;
  } else if (document.body.style.backgroundImage.indexOf("url") > -1) { //Traditional skin
      result = true;
  } else if (document.getElementsByClassName("jpx-wp-wrapper").length > 0) { // just premium
      result = true;
  } else if (!!document.getElementById("ayads-html")) { // improve digital
      result = true;
  } else if (!!document.querySelector("html.adsm-skin")) { // adnami
      result = true;
  }
  return result;
}

function detectTopscroll() {
  var result = false;
  if (!!document.querySelector("html.adnm-topscroll")) { // adnami
      result = true;
  }
  return result;
}



function initATFAds() {
  //ATF reload
  try {
      if (pageVariables["environment"] !== "NoAds") {
    if ( (slot_1x1 !== undefined) && !refreshedMap["div-1x1"] ) {
      var banner_div = document.createElement("div");
      banner_div.id = "div-1x1";
      banner_div.style.textAlign = "center";
      banner_div.style.marginLeft = "auto";
      banner_div.style.marginRight = "auto";
      banner_div.setAfter(document.querySelector("main"));
      googletag.cmd.push(function() {
                  googletag.display("div-1x1");
                  refreshAdslot(slot_1x1);
              });
    }
          if ((slot_Leaderboard_1 !== undefined) && !refreshedMap["div-Leaderboard_1"]) {
      var target = document.querySelector("#adBanner");
      var banner_div_Leaderboard_1 = document.createElement("div");
      banner_div_Leaderboard_1.id = "div-Leaderboard_1";
      //banner_div_Leaderboard_1.setBefore(target);
              target.append(banner_div_Leaderboard_1);
              googletag.cmd.push(function() {
                  googletag.display("div-Leaderboard_1"); //new
                  refreshAdslot(slot_Leaderboard_1);
              });
          }
          if ((slot_Mobile_Square_1 !== undefined) && !refreshedMap["div-Mobile_Square_1"] && isAdunitWithinYOffset("div-Mobile_Square_1", mobile_delta) && pageVariables["subsection-category"] !== "articlepage") {
              googletag.cmd.push(function() {
                  googletag.display("div-Mobile_Square_1"); //new
                  refreshAdslot(slot_Mobile_Square_1);
              });
          }
          if ((slot_Mobile_Square_2 !== undefined) && !refreshedMap["div-Mobile_Square_2"] && isAdunitWithinYOffset("div-Mobile_Square_2", mobile_delta) && pageVariables["subsection-category"] !== "articlepage") {
              googletag.cmd.push(function() {
                  googletag.display("div-Mobile_Square_2"); //new
                  refreshAdslot(slot_Mobile_Square_2);
              });
          }
          if ((slot_Mobile_Square_3 !== undefined) && !refreshedMap["div-Mobile_Square_3"] && isAdunitWithinYOffset("div-Mobile_Square_3", mobile_delta) && pageVariables["subsection-category"] !== "articlepage") {
            googletag.cmd.push(function() {
                googletag.display("div-Mobile_Square_3"); //new
                refreshAdslot(slot_Mobile_Square_3);
            });
        }
    if (pageVariables['viewport-width'] > 1400) {

      setTimeout(function() {
        var wallpaperDetected = detectWallpaper();
        var topscrollDetected = detectTopscroll();
          if (!wallpaperDetected && !topscrollDetected) {
            createSidebanners();
            refreshSidebanners();
          }
        }, 4000);
    }
      }
  } catch (err) {
      printError(err, "Failure in ATF slot pre reload.");
  }
}

var gServicesEnabled = false;

adslotStates = {};

var noExpanding = {
allowOverlayExpansion: false,
allowPushExpansion: false
};

googletag.cmd.push(function() {
    "use strict";
  
    googletag.pubads().collapseEmptyDivs();
    if (pageVariables["environment"] !== "NoAds") {
        if (is_mobile) {
            /* if (pageVariables["subsection-category"] === "articlepage") { */
                slot_Mobile_Article_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_1', getFluidAdSizes("mobile"), "div-Mobile_Article_1").addService(googletag.pubads());
                slot_Mobile_Article_2 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_2', getFluidAdSizes("mobile"), "div-Mobile_Article_2").addService(googletag.pubads());
                slot_Mobile_Article_3 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_3', getFluidAdSizes("mobile"), "div-Mobile_Article_3").addService(googletag.pubads());
                slot_Mobile_Article_4 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_4', getFluidAdSizes("mobile"), "div-Mobile_Article_4").addService(googletag.pubads());
                slot_Mobile_Article_5 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_5', getFluidAdSizes("mobile"), "div-Mobile_Article_5").addService(googletag.pubads());
                slot_Mobile_Article_6 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_6', getFluidAdSizes("mobile"), "div-Mobile_Article_6").addService(googletag.pubads());
        slot_Mobile_Article_7 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_7', getFluidAdSizes("mobile"), "div-Mobile_Article_7").addService(googletag.pubads());
        slot_Mobile_Article_8 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Article_8', getFluidAdSizes("mobile"), "div-Mobile_Article_8").addService(googletag.pubads());
            /* } */
            slot_Mobile_Square_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Square_1', getFluidAdSizes("mobile"), 'div-Mobile_Square_1').addService(googletag.pubads());
            slot_Mobile_Square_2 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Square_2', getFluidAdSizes("mobile"), 'div-Mobile_Square_2').addService(googletag.pubads());
            slot_Mobile_Square_3 = googletag.defineSlot('/49662453/PengehjoernetDK/Mobile_Square_3', getFluidAdSizes("mobile"), 'div-Mobile_Square_3').addService(googletag.pubads());
            slot_Mobile_Anchor = googletag.defineOutOfPageSlot('/49662453/PengehjoernetDK/Mobile_Anchor', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
            if (slot_Mobile_Anchor) {
                slot_Mobile_Anchor.addService(googletag.pubads());
            }
        } else {
            slot_Leaderboard_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Leaderboard_1', getAdSizes("topboard"), "div-Leaderboard_1").addService(googletag.pubads());
            slot_Leaderboard_2 = googletag.defineSlot('/49662453/PengehjoernetDK/Leaderboard_2', getFluidAdSizes("board"), "div-Leaderboard_2").addService(googletag.pubads());
            slot_Leaderboard_3 = googletag.defineSlot('/49662453/PengehjoernetDK/Leaderboard_3', getFluidAdSizes("board"), "div-Leaderboard_3").addService(googletag.pubads());
            /* if (pageVariables["viewport-width"] > desktopMinViewportWidth) {
                slot_Square_1 = googletag.defineSlot('/49662453/PengehjoernetDK/Square_1', getFluidAdSizes("infeed"), "div-Square_1").addService(googletag.pubads());
            } */
      if (pageVariables['viewport-width'] > 1675) {
                slot_160x600_L = googletag.defineSlot('/49662453/PengehjoernetDK/160x600_L', getAdSizes("skyscraper"), "div-160x600_L").addService(googletag.pubads());
                slot_160x600_R = googletag.defineSlot('/49662453/PengehjoernetDK/160x600_R', getAdSizes("skyscraper"), "div-160x600_R").addService(googletag.pubads());
            }
            /* if (pageVariables["subsection-category"] === "articlepage") { */
        slot_InText_1 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_1', getAdSizes("intext"), "div-InText_1").addService(googletag.pubads());
        slot_InText_2 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_2', getAdSizes("intext"), "div-InText_2").addService(googletag.pubads());
        slot_InText_3 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_3', getAdSizes("intext"), "div-InText_3").addService(googletag.pubads());
        slot_InText_4 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_4', getAdSizes("intext"), "div-InText_4").addService(googletag.pubads());
        slot_InText_5 = googletag.defineSlot('/49662453/PengehjoernetDK/InText_5', getAdSizes("intext"), "div-InText_5").addService(googletag.pubads());
            /* }  */ 
        }
        slot_1x1 = googletag.defineSlot('/49662453/PengehjoernetDK/1x1', getAdSizes("pixel"), "div-1x1").addService(googletag.pubads());
    }
  
    googletag.pubads().set("page_url", pageVariables["canonical-url"]);
    googletag.pubads().setTargeting("environment", pageVariables["environment"]);
    googletag.pubads().setTargeting("page_url", pageVariables["canonical-url"]);
    googletag.pubads().setTargeting("subsection", pageVariables["subsection-category"]);
    googletag.pubads().setTargeting("news-category", pageVariables["news-category"]);
    googletag.pubads().setTargeting("connection", connectionNG);
    googletag.pubads().setTargeting("is-restricted", pageVariables["restricted"]);
    googletag.pubads().setTargeting("viewport-width", pageVariables["viewport-width"].toString());
    googletag.pubads().setTargeting("viewport-height", pageVariables["viewport-height"].toString());
    //googletag.pubads().setTargeting("is-first-pageview", isFirstVisit());
    googletag.pubads().setTargeting("is-cookies-enabled", navigator.cookieEnabled ? "Yes" : "No");
    //googletag.pubads().setTargeting("is-reloaded", isPageReloaded());
    googletag.pubads().setTargeting("is-wallpaper-fitting", pageVariables["viewport-width"] >= 1600 ? "Yes" : "No");
    googletag.pubads().setTargeting("is-fully-expanded", (pageVariables['viewport-width'] >= contentAreaMaxWidth) ? "Yes" : "No");
    googletag.pubads().setTargeting("device", deviceClassification);
    googletag.pubads().setTargeting("dice", pageVariables["dice"]);
    googletag.pubads().setTargeting("section-iab", pageVariables["sectioncat"]);
    googletag.pubads().setTargeting("section-iabname", pageVariables["sectioncat-name"]);
    googletag.pubads().setTargeting("browserName", browserName);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().disableInitialLoad(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=1;
    googletag.pubads().setSafeFrameConfig({
        allowPushExpansion: true,
        allowOverlayExpansion: true
    });
    try {
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            var renderDiv;
            renderDiv = event.slot.getSlotElementId();
            if (event.isEmpty) {
                adslotStates[renderDiv] = "Empty";
            } else {
                adslotStates[renderDiv] = event.size;
        
                if (Array.isArray(event.size) && (event.size.length === 2) && (renderDiv.indexOf("InText") > -1)) {
                    if ((event.size[0] > 10) && (event.size[0] < 400)) {
                        document.getElementById(renderDiv).style.float = "right";
                        document.getElementById(renderDiv).style.clear = "right";
                        document.getElementById(renderDiv).style.marginLeft = "15px";
                    } else if (event.size[0] === 1) {
                        var realWidth = parseInt(document.querySelector("#" + renderDiv + " > div > iframe").width, 10);
                        if ((realWidth > 10) && (realWidth < 400)) {
                            document.getElementById(renderDiv).style.float = "right";
                            document.getElementById(renderDiv).style.clear = "right";
                            document.getElementById(renderDiv).style.marginLeft = "15px";
                        }
                    }
                }
        
            }
        });
    } catch (err) {
        printError(err, "Bug in slotRenderEnded listener");
    }
    try {
        if (usingIabCMP) {
            //Fallback timeout start
            var fallbackEnableService = setTimeout(function() {
                if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                    gServicesEnabled = true;
                    googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                    printInfo("fallbackEnableService entered. This should not happen and indicates race conditions between CPM and GAM. Try loading the CMP script earlier...");
                    initATFAds();
                }
            }, 8000);
            if (cookieCMP === "GAM") {
                window.googlefc = window.googlefc || {};
                window.googlefc.ccpa = window.googlefc.ccpa || {};
                window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
                googlefc.callbackQueue.push({
                    'CONSENT_DATA_READY': function() { //assumes (data.eventStatus === 'tcloaded' || data.eventStatus === 'useractioncomplete') is implicit by CONSENT_DATA_READY, but no sure
                        __tcfapi('getTCData', 0, function(data, success) {
                            if (success) {
                                if (!!data.gdprApplies) {
                                    tcString = data.tcString;
                                    /* Purpose threatment */
  
                                    // @see: https://support.didomi.io/google-limited-ads
                                    //var localStorageAccessAllowed = data.purpose.consents[1];  //if allowed to access the browsers local storage, e.g. for setting and reading cookies
                                    var basisAdsAllowed = data.purpose.consents[2]; //if allowed to show non-personalized ads based on e.g. conextual targeting or targeted browser info like user language
                                    //                                var targetingMappingAllowed = data.purpose.consents[3];    //if allowed to gather personal informations, e.g. for later targeting
                                    //                                var profileTargetingAllowed = data.purpose.consents[4];      //if allowed to display ads based on personal informations and history, e.g. user has been on eBay previously
                                    var adsPerformanceTrackingAllowed = data.purpose.consents[7]; //if allowed to measure ads performance, e.g. viewabillity tracking
                                    //                                var audienceTargetingAllowed = data.purpose.consents[9];    //if allowed to make audience targeting based on e.g. marketing survys
                                    //                                var dataOptimazionAllowed = data.purpose.consents[10];      //if allowed to use data for product delevopment and improvements, e.g. machine learning
                                    //                                
  
                                    /* Vendor threatment */
  
                                    //... see https://iabeurope.eu/vendor-list-tcf-v2-0/
                                    var disallowedVendors = [];
                                    for (var vendor in data.vendor.consents) {
                                        if (data.vendor.consents.hasOwnProperty(vendor) && data.vendor.consents[vendor] === false) {
                                            disallowedVendors.push(vendor.toString(10));
                                            /*if (vendor === 42) {
                                                taboolaInFeedMax = 0;
                                            }*/
                                        }
                                    }
                                    /*if (!basisAdsAllowed || !adsPerformanceTrackingAllowed) {
                                        taboolaInFeedMax = 0;
                                    }*/
  
                                }
  
                                /* Debugging */
  
                                if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                    printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                                }
                                if (window.location.href.indexOf('?cookie-control') > -1) {
                                    try {
                                        googlefc.callbackQueue.push(googlefc.showRevocationMessage);
                                    } catch (err) {
                                        printError(err, "Cookie Revocation failed. Please contact admin@mgdk.dk");
                                    }
                                }
                            }
                        }); //Normal start
                        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                            clearTimeout(fallbackEnableService);
                            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                            gServicesEnabled = true;
                        }
  
                        initATFAds();
                    }
                });
            } else if (cookieCMP === "ConsentManager") {
                if (typeof window.__cmp === 'function') {
                    if (!!__cmp('getCMPData') && __cmp('getCMPData').consentExists) {
                        var data = __cmp('getCMPData');
                        tcString = data.consentstring;
                        /* Debugging */
                        if (window.location.href.indexOf("?gdpr_debug") > -1) {
                            printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                        }
                        //Normal start
                        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                            gServicesEnabled = true;
                            clearTimeout(fallbackEnableService);
                            //setTimeout(function() {
                            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                            //}, 1000);
                        }
                        //ATF reload
                        initATFAds();
                    }
                    if (!gServicesEnabled) {
                        __cmp("addEventListener", ["consent", function(e, o) {
                            var data = __cmp('getCMPData');
                            tcString = data.consentstring;
                            /* Debugging */
                            if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                            }
                            //Normal start
                            if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                                clearTimeout(fallbackEnableService);
                                //setTimeout(function() {
                                googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                                //}, 1000);
                                gServicesEnabled = true;
                            }
                            //ATF reload
                            initATFAds();
                        }, false], null);
                    }
                } else {
                    printInfo("Waiting one second for window.__cmp...");
                    setTimeout(function() {
                        if (typeof window.__cmp === 'function') {
                            __cmp("addEventListener", ["consent", function(e, o) {
                                var data = __cmp('getCMPData');
                                tcString = data.consentstring;
                                /* Debugging */
                                if (window.location.href.indexOf("?gdpr_debug") > -1) {
                                    printInfo("--BEGIN TFC--\n" + JSON.stringify(data, null, 2) + "\n--END TFC--");
                                }
                                //Normal start
                                if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                                    clearTimeout(fallbackEnableService);
                                    //setTimeout(function() {
                                    googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                                    //}, 1000);
                                    gServicesEnabled = true;
                                }
                                //ATF reload
                                initATFAds();
                            }, false], null);
                            printInfo("Done.");
                        } else {
                            printInfo("Please consider if the CMP can load any faster!");
                        }
                    }, 1000);
                }
            }
        } else { //CMP Disabled start
            if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
                googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
                gServicesEnabled = true;
                //ATF reload
                initATFAds();
            }
        }
    } catch (err) { //Failover start
        printError(err, "Error in googlefc");
        if ((pageVariables["environment"] !== "NoAds") && !gServicesEnabled) {
            gServicesEnabled = true;
            googletag.enableServices(); //AdSense API: (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=0
            //ATF reload
            initATFAds();
        }
    }
  });


  var adsScrollListener = function() {
    var adSlots = [
        { id: "div-InText_1", slot: slot_InText_1, desktop: true, offset: desktop_delta, paragraph: 5 },
        { id: "div-InText_2", slot: slot_InText_2, desktop: true, offset: desktop_delta },
        { id: "div-InText_3", slot: slot_InText_3, desktop: true, offset: desktop_delta, paragraph: 15 },
        { id: "div-InText_4", slot: slot_InText_4, desktop: true, offset: desktop_delta, paragraph: 20 },
        { id: "div-InText_5", slot: slot_InText_5, desktop: true, offset: desktop_delta, paragraph: 25 },
        { id: "div-Square_1", slot: slot_Square_1, desktop: true, offset: desktop_delta },
        { id: "div-Leaderboard_2", slot: slot_Leaderboard_2, desktop: true, offset: desktop_delta },
        { id: "div-Leaderboard_3", slot: slot_Leaderboard_3, desktop: true, offset: desktop_delta },
        { id: "div-Mobile_Article_1", slot: slot_Mobile_Article_1, desktop: false, offset: mobile_article_delta, paragraph: 2 },
        { id: "div-Mobile_Article_2", slot: slot_Mobile_Article_2, desktop: false, offset: mobile_article_delta, paragraph: 7 },
        { id: "div-Mobile_Article_3", slot: slot_Mobile_Article_3, desktop: false, offset: mobile_article_delta, paragraph: 12 },
        { id: "div-Mobile_Article_4", slot: slot_Mobile_Article_4, desktop: false, offset: mobile_article_delta, paragraph: 17 },
        { id: "div-Mobile_Article_5", slot: slot_Mobile_Article_5, desktop: false, offset: mobile_article_delta, paragraph: 22 },
        { id: "div-Mobile_Article_6", slot: slot_Mobile_Article_6, desktop: false, offset: mobile_article_delta, paragraph: 27 },
        { id: "div-Mobile_Article_7", slot: slot_Mobile_Article_7, desktop: false, offset: mobile_article_delta, paragraph: 32 },
        { id: "div-Mobile_Article_8", slot: slot_Mobile_Article_8, desktop: false, offset: mobile_article_delta, paragraph: 37 },
        { id: "div-Mobile_Square_1", slot: slot_Mobile_Square_1, desktop: false, offset: mobile_delta },
        { id: "div-Mobile_Square_2", slot: slot_Mobile_Square_2, desktop: false, offset: mobile_delta },
        { id: "div-Mobile_Square_3", slot: slot_Mobile_Square_3, desktop: false, offset: mobile_delta }
    ];

    var checkConditions = function(adSlot, isDesktop) {
        if (isDesktop && adSlot.desktop) {
            return adSlot.paragraph ? isParagraphWithinYOffset(adSlot.paragraph, adSlot.offset) : isAdunitWithinYOffset(adSlot.id, adSlot.offset);
        } else if (!isDesktop && !adSlot.desktop) {
            return adSlot.paragraph ? isParagraphWithinYOffset(adSlot.paragraph, adSlot.offset) : isAdunitWithinYOffset(adSlot.id, adSlot.offset);
        }
        return false;
    };

    adSlots.forEach(function(adSlot) {
        //console.log(adSlot);
        if (adSlot.slot !== undefined && !refreshedMap[adSlot.id] && checkConditions(adSlot, is_desktop)) {
            try {
                if (adSlot.paragraph) {
                    var bannerDiv = createInTextBannerForDisplay(parseInt(adSlot.id.split('_')[1]));
                    if (!!bannerDiv && bannerDiv.setAfterParagraph(adSlot.paragraph)) {
                        googletag.cmd.push(function() {
                            googletag.display(bannerDiv.id);
                            refreshAdslot(adSlot.slot);
                        });
                    } else {
                        printInfo("Not enough paragraphs for inserting " + bannerDiv.id);
                    }
                } else {
                    googletag.cmd.push(function() {
                        googletag.display(adSlot.id);
                        refreshAdslot(adSlot.slot);
                    });
                }
            } catch (err) {
                printError(err, "Failed to insert " + adSlot.id);
            }
        }
    });

    if (!is_desktop && !!slot_Mobile_Anchor && !refreshedMap["gpt_unit_/49662453/PengehjoernetDK/Mobile_Anchor_0"] && ("scrollY" in window) && (window.scrollY > 2500)) {
        googletag.cmd.push(function() {
            refreshAdslot(slot_Mobile_Anchor);
        });
    }
};


if (pageVariables.environment !== "NoAds") {
    const options = { passive: true };
  
    try {
      window.addEventListener('scroll', adsScrollListener, options);
    } catch (err) {
      window.addEventListener('scroll', adsScrollListener);
      console.error("Passive scroll listener failed", err);
    }
  }

// Refresh ADS on navigation
window.navigation.addEventListener("navigate", (event) => {
    console.log('location changed!');
    Object.keys(ads).forEach(adId => {
        refreshedMap[adId] = false;
    });
});


function createInTextBannerForDisplay(num) {
    if (pageVariables.environment === "NoAds" || pageVariables.environment === "LimmitedAds" || !is_desktop) return null;
  
    const banner_div_id = `div-InText_${num}`;
    let banner_div = document.getElementById(banner_div_id);
  
    if (!banner_div) {
      banner_div = document.createElement("div");
      banner_div.id = banner_div_id;
      banner_div.className = "intext-banner";
      banner_div.style.textAlign = "center";
      banner_div.style.maxWidth = pageVariables["viewport-width"] >= 1400 ? "930px" : "";
      banner_div.style.marginBottom = "0.5em";
    }
  
    return banner_div;
  }
  
  function createSidebanners() {
    const contentElement = document.querySelector("main");
    const createSticky = (id, side) => {
      const sticky = document.createElement("div");
      sticky.style.position = "absolute";
      sticky.style.top = "350px";
      sticky.style[side] = "calc(50vw + 670px)";
      sticky.style.height = `${contentElement.clientHeight - 200}px`;
      sticky.style.width = "160px";
  
      const banner = document.createElement("div");
      banner.id = id;
      banner.style.position = "sticky";
      banner.style.top = "250px";
      banner.style.width = "160px";
      banner.style.height = "600px";
      sticky.appendChild(banner);
  
      return sticky;
    };
  
    document.body.appendChild(createSticky("div-160x600_L", "right"));
    document.body.appendChild(createSticky("div-160x600_R", "left"));
  
    const updateSidebarHeight = () => {
      const height = `${contentElement.clientHeight - 200}px`;
      document.getElementById("div-160x600_L").parentElement.style.height = height;
      document.getElementById("div-160x600_R").parentElement.style.height = height;
    };
  
    try {
      window.addEventListener('scroll', updateSidebarHeight, { passive: true });
    } catch (err) {
      window.addEventListener('scroll', updateSidebarHeight);
      console.error("Passive scroll listener failed", err);
    }
  
    updateSidebarHeight();
  }
  
  function refreshSidebanners() {
    const slots = ["div-160x600_L", "div-160x600_R"];
    const refreshAds = () => {
      googletag.pubads().refresh([slot_160x600_L, slot_160x600_R]);
    };
  
    if (prebidEnabled) {
      try {
        pbjs.que.push(() => {
          pbjs.requestBids({
            timeout: PREBID_TIMEOUT,
            adUnitCodes: slots,
            bidsBackHandler: () => {
              pbjs.setTargetingForGPTAsync(slots);
              refreshAds();
            }
          });
        });
      } catch (err) {
        refreshAds();
        printError(err, "No prebid for sidebanners");
      }
    } else {
      refreshAds();
    }
  }

  function rollDice(min, max) {
    "use strict";
    return min + Math.floor(Math.random() * (max - min + 1));
  }
  pageVariables["dice"] = rollDice(1, 6).toString();
  