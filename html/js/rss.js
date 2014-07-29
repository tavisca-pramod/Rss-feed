
//to be reused while fetching images
var token = 'jvrkbnfg4twkahlqc0t3gf3g';
//to create car specific html
var isCarSelected = true;

var goBtn = document.getElementById("goBtn");

var feedUrl = document.getElementById("feedUrl");

goBtn.onclick = function () {
    var url = document.getElementById("rssFeedOptions");

    url = 'http://googlefeed.appacitive.com/?q=http://timesofindia.feedsportal.com/c/33039/f/533982/index.rss';

    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.open('GET', url, true);

    xmlHttpRequest.onreadystatechange = function () {

        if (xmlHttpRequest.readyState == 4) {
            var response = xmlHttpRequest.responseText;

            var feed = JSON.parse(xmlHttpRequest.responseText);

            createFeedObject(feed.responseData.feed);
        }
    }

    xmlHttpRequest.send();
}


function createFeedObject(feedJson) {

    var feed = new RssReader.Feed(feedJson.author, feedJson.title, feedJson.description,
            feedJson.feedUrl, feedJson.link);

    for (i = 0, totalEntries = feedJson.entries.length; i < totalEntries; i++)
    {
        var entry = new RssReader.FeedEntry(feedJson.entries[i].content, feedJson.entries[i].contentSnippet,
            feedJson.entries[i].link, feedJson.entries[i].publishedDate, feedJson.entries[i].title);

        feed.feedEntries.push(entry);
    }

    createHtmlFeeds(feed);
}

function createHtmlFeeds(feed)
{
        var container = document.getElementsByClassName('container')[0];
        var feedTitleRow = document.createElement('div');

        feedTitleRow.className = "row well"

        var feedTitle = document.createElement('div');
        feedTitle.id = 'feedTitle';
        feedTitle.innerText = feed.title;
        feedTitle.className = 'feed-title';
    
        var feedDescription = document.createElement('div');
        feedDescription.id = 'feedDescription'; 
        feedDescription.className = "feed-description";
        feedDescription.innerText = feed.description;

        feedTitleRow.appendChild(feedTitle);
        feedTitleRow.appendChild(feedDescription);

        container.appendChild(feedTitleRow);

        for (i = 0, totalEntries = feed.feedEntries.length; i < totalEntries; i++)
        {
            var entry = feed.feedEntries[i];
            var feedEntry = document.createElement('div');
            feedEntry.className = "row well"
            var feedEntryTitleRow = document.createElement('div');

                var feedEntryTitle = document.createElement('a');
                feedEntryTitle.innerText = entry.title;
                feedEntryTitle.href = entry.link;

                var feedEntryPublishDate = document.createElement('span');
                feedEntryPublishDate.innerText = entry.publishedDate;

                feedEntryTitleRow.appendChild(feedEntryTitle);
                feedEntryTitleRow.appendChild(feedEntryPublishDate);

            var feedEntryContent = document.createElement('div');
            feedEntryContent.innerText = entry.contentSnippet;

        feedEntry.appendChild(feedEntryTitleRow);
        feedEntry.appendChild(feedEntryContent);
        container.appendChild(feedEntry);
    }
}