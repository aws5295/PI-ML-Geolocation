# PI-ML-Geolocation
A sample web application for viewing PI Manual Logger Geolocation data

## About
System Administrators want to confirm the physical location in which [PI Manual Logger](https://techsupport.osisoft.com/Products/Visualization/PI-Manual-Logger/Overview) operators collect data, as well as the total amount of time spent collecting data for a tour run.

To aid administrators PI ML Web 2017 introduced 2 new pieces of meta-data associated with a Tour Run:
* The operator's geolocation when a value is entered for each data item during a tour run
* The total time spend collecting data during a tour run

However, accessing the geolocation data is not possible using PI ML PC, and accessing the tour run duration is not trivial.

## Objectives
This application was created with 2 purposes in mind:
* To demonstrate **how** this meta-deta can be programmatically accessed for consumption by an application
* To provide users with a **simple** working **sample** out-of-the-box that they can modify/extend to suit their specific needs

## Contributing
I am by no means a [Node.js](https://nodejs.org/en/) expert.  There is no guarantee that this sample represents the current best-practices for Node.js. Additionally, this is not intended to be an *Enterprise-class* application.  I tried to make the application as simple as possible, while still demonstrating the **objectives** above.  

However, I am always open to suggestions/feedback.  Please feel free to open an issue for any outstanding/blatant issues you have wiht the project.  If you would like to contribute, feel free to submit a Pull Request - keeping in mind that integrating the contribution may require some adjustments to your code to adhere to the **objectives** above.

## Licensing
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at 

`http://www.apache.org/licenses/LICENSE-2.0`

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Please see the file named [LICENSE](LICENSE).
