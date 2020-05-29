<h1>Endpoints</h1>
<h2>1 comments</h2>
<h3>1.1 /api/comments/:section<h3>
<p>Method: GET</p>
<p>Description: Users can use this endpoint to get all the comments from the respective section of the page</p>
<h3>1.2 /api/comments/:section<h3>
<p>Method: POST</p>
<p>Description: Users can post a comment using this endpoint and his respective comment box. Before showing the comment in the page, admin needs to approved it</p>
<h3>1.3 /api/comments/Admin/:section<h3>
<p>Method: GET</p>
<p>Description: The admin use this endpoint to get a list of comments that are waiting review filtered by section</p>
<h3>1.4 /api/comments/Admin/:id<h3>
<p>Method: PATCH</p>
<p>Description: The admin use this endpoint to update the status of the comment, in other words, it is used to approves comments</p>
<h3>1.5 /api/comments/Admin/:id<h3>
<p>Method: DELETE</p>
<p>Description: The admin use this endpoint to delete the a comment in the list, in case that it was not approved</p>
<h2>2 leaderboard</h2>
<h3>2.1 /api/leaderboard/table</h3>
<p>Method: GET</p>
<p>Description: This endpoint is used by the users to get leaderboard data. Data is sorted, first by "p
Points" and second by "Goals positives" before appear</p>
<h3>2.2 /api/leaderboard/table</h3>
<p>Method: POST</p>
<p>Description: This endpoint is used by the admin to post a new leaderboard. In this way every time that data is updated the old one is deleted</p>
<h3>2.3 /api/leaderboard/table</h3>
<p>Method: DELETE</p>
<p>Description: This endpoint is used by the admin to delete leaderboard data</p>
<h2>3 auth</h2>
<h3>3.1 /api/auth</h3>
<p>Method: POST</p>
<p>Description: This endpoint is used by the admin to validate its username and password. Bcrypt use a passaword hashed to be more secure</p>
<h2>4 news</h2>
<h3>4.1 /api/news</h3>
<p>Method: GET</p>
<p>Description: Users can get all news posted by the admin with this endpoint</p>
<h3>4.2 /api/news</h3>
<p>Method: POST</p>
<p>Description: The admin can post news using this endpoint, providing a Title, an image url (optional) and a text</p>
<h2>5 weeklymatch</h2>
<h3>5.1 /api/weeklymatch</h3>
<p>Method: GET</p>
<p>Description: Users can get all weekly matches posted by the admin with this endpoint</p>
<h3>5.2 /api/weeklymatch</h3>
<p>Method: POST</p>
<p>Description: The admin can post weekly matches using this endpoint</p>
<h2>6 bestOfLeague</h2>
<h3>6.1 /api/best</h3>
<p>Method: GET</p>
<p>Description: Users can get the newest data about the best teams and players posted by the admin with this endpoint</p>
<h3>6.2 /api/best</h3>
<p>Method: POST</p>
<p>Description: The admin can post data about the best teams and players using this endpoint</p>
<h2>7 media</h2>
<h3>7.1 /api/media/photos</h3>
<p>Method: GET</p>
<p>Description: Users can get all the photos posted by the admin in the multimedia section with this endpoint</p>
<h3>7.2 /api/media/videos</h3>
<p>Method: GET</p>
<p>Description: Users can get all the videos posted by the admin in the multimedia section with this endpoint</p>
<h3>7.3 /api/media/</h3>
<p>Method: POST</p>
<p>Description: The admin occasionally can post photos or videos requested by the users in comments using this endpoint</p>
