# Infosys-Springboard---Content-Management-System

Step 1: Install Node.js
1.	Download Node.js:
•	Visit the official Node.js website.
•	Download the LTS version suitable for your operating system.

2.	Install Node.js:
•	Run the installer and follow the instructions.
•	To verify the installation, open a terminal and run:
node -v
npm -v

Step 2: Install XAMPP
1.	Run the Installer:
•	Navigate to the folder where the XAMPP installer was downloaded.
•	Double-click the installer file.
2.	Start the Installation:
•	You may see a warning about User Account Control (UAC). Click "OK" to proceed.
•	Click "Next" on the setup wizard to begin the installation process.
3.	Select Components:
•	Choose the components you want to install. By default, all components are selected. If you're unsure, leave the default selections and click "Next".
4.	Choose Installation Folder:
•	Select the folder where you want to install XAMPP. Click "Next".
5.	Begin Installation:
•	Click "Next" to start the installation. The process may take a few minutes.
6.	Finish Installation:
•	Once the installation is complete, you can choose to start the XAMPP Control Panel immediately. Click "Finish" to exit the setup wizard.

Step 3: Start XAMPP
1.	Open XAMPP Control Panel:
•	If you didn't start the Control Panel during installation, you can open it from the Start Menu or from the installation directory (e.g., C:\xampp\xampp-control.exe).
2.	Start Services:
•	In the XAMPP Control Panel, you will see a list of services (Apache, MySQL, etc.).
•	Click "Start" next to Apache and MySQL to start these services. Ensure they are running without errors.
3.	Verify Installation:
•	Open a web browser and go to http://localhost/. You should see the XAMPP dashboard, indicating that Apache is running.
•	To access phpMyAdmin, go to http://localhost/phpmyadmin/. You can manage your MySQL databases here.
Step 4: Install Strapi
1.	Install Strapi CLI:
•	Open a terminal and run:
npm install -g create-strapi-app
2.	Create a New Strapi Project:
•	Run the following command to create a new Strapi project:
npx create-strapi-app strapi
During the setup process, choose "Custom" (manual settings) when prompted for the database, and then select "MySQL".
3.	Configure Strapi to Use MySQL
•	Provide Database Details:
Database name: The name of your MySQL database.(cms_database)
Host: Usually localhost.
Port: The default MySQL port is 3306.
Username: Your MySQL username.(root)
Password: Your MySQL password.()
Enable SSL connection: Typically n for local development.
•	Install Dependencies:
Strapi will install the necessary dependencies, including the MySQL connector.

Step 5: Start Strapi
1.	Navigate to Your Strapi Project Directory:
cd strapi
2.	Start the Strapi Server:
npm run develop

Step 6: Verify the Installation
1.	Access the Strapi Admin Panel:
Open a browser and go to http://localhost:1337/admin.
2.	Create an Admin User:
Follow the setup instructions to create an admin user.

Step 7: Install Angular
1.	Install Angular CLI:
•	Open a terminal and run:
npm install -g @angular/cli
2.	Create a New Angular Project:
•	Run the following command to create a new Angular project:
ng new angular-app
3.	Navigate into the project directory:
cd angular-app
4.	Start the Angular development server:
ng serve
Open a browser and go to http://localhost:4200/ to see the Angular application running.

