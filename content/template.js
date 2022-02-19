module.exports = {
    render: function(data) {
      var template = `\
---
slug: ${data.titleForSlug}
date: ${data.published}
title: "${data.title}"
template: "post"
categories:
  - NiceDay
tags: [${data.tags.join(',')}]
---

${data.body}
  `;
  
      return template;
    },
    getOptions: function() {
      return {
        folderForEachSlug: false, // same folder for all posts
        imagePath: '../media', // <img src="/media/[filename]" >. Used in the markdown files.
        // This field is ignored when folderForEachSlug:true. Should be absolute. Location where medium images will be saved.
        imageFolder:
          '/Users/umar/dev/personal/v2.umarniz.com/content/media', 
        defaultCodeBlockLanguage: '', // code fenced by default will be ``` with no lang. If most of your code blocks are in a specific lang, set this here.
      };
    },
  };