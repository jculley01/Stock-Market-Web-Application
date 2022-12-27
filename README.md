# Stock Market Web Application

Team Name: Los Perros

Members: Jose Batlle, Ruben Carbajal, John Culley, Kai Imery

Emails: jabatlle@bu.edu, rubenfc@bu.edu, jculley@bu.edu, kimery@bu.edu

Tick Stock is a stock ticker website that will provide the recent stock trend and the news surrounding a respective company's stock inputted by the user. We created this project to efficiently present relevant information on a company to invest. To collect the real data needed for this project we used the Polygon API, Apex Charts to visualize the data, and react/javascript/html for the website itself.

To "Build" our project you first need to build a React App and then need to make sure you install and import all of the proper packages and ensure you have node js installed. The packages that are necessary for this project were all of the material UI packages such as the defualt installation, styled-components, peer dependencies, icons, and the roboto font. After that we install apex chart for allow us to import the chandle stock graph. Also we pulled from another API called finnhub, which also helped creating the candlestick chart. Last but not least we used a free API key from Polyon io, this was essential in allowing us to pull real recent data for the user to use. App.js uses the components Header.jsx, Aggregate.jsx, Details.jsx, and News.jsx to construct the UI.

Note: Since we are using a free API key for Polygon io, we are only allowed 5 searches a minutes, so we highly recommend creating your own API key and inserting your own key in the API URL. Another option would be purchasing the premium version of Polygon IO where the calls are unlimited.

Youtube Video: 
https://youtu.be/UMad2r16zcE
