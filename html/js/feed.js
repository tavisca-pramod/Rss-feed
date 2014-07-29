var RssReader = RssReader || {};

RssReader.Feed = function (author, title, description, feedUrl,  link)
{
    this.author = author;
    this.title = title;
    this.description = description;
    this.feedUrl = feedUrl;
    this.link = link;

    this.feedEntries = new Array();
}

RssReader.FeedEntry = function (content, contentSnippet, link, publishedDate, title) {

    this.content = content;
    this.contentSnippet = contentSnippet;
    this.link = link;
    this.publishedDate = publishedDate;
    this.title = title;
}
