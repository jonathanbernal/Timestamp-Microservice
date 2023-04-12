# Timestamp Microservice
With this microservice, you can make API calls and get a response with both the UNIX representation of the input date and the date in UTC format. The api supports the following formats: MM-DD-YYYY, DD-MM-YYYY or DD-Mon-YYYY, along with a time format that follows any of the aforementioned formats.

## How to Run
Open this project as your active directory in VSCode or if you're using the CMD only, use cd (Linux/Mac) or dir (Windows) to change to this directory.

You must have Node.js and npm installed on your computer. If you want to verify that Node is installed on your computer, you can type in node -v and npm -v on the command line, respectively.

Once you have verified both Node and npm are installed, you can run npm install on the command line. This will install the necessary packages for you to run this project. You can verify what packages will be installed by opening package.json and check out the dependencies section.

Once the required packages are installed, run npm start to start the server. The server will start on port 8001 by default, but you can change the port value to whatever other port you desire by editing index.js.

## How to Use
Go to https://localhost:PORT_NUMBER/api/:date, where PORT_NUMBER is the port specified under index.js and :date is the input date argument you'd like to provide. For instance, if you want to get the data representation of the date 12-21-1995 running on port 3000, you can go to https://localhost:3000/api/12-21-1995. This will return a response with a JSON object containing both the integer representation of the date since 1970 and the actual date.

Feel free to experiment with different formats and see what results you get. Don't forget to also include a timestamp in the format HH:MM:SS GMT if you want to include a time in the UTC (Coordinated Universal Time) format.