/*
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Threading;
using System.Device.Location;

namespace WPCordovaClassLib.Cordova.Commands
{
    /// <summary>
    /// This is a command stub, the browser provides the correct implementation.  We use this to trigger the static analyzer that we require this permission
    /// </summary>
    public class Geolocation
    {
        /* Unreachable code, by design -jm */
        private void triggerGeoInclusion()
        {
            new GeoCoordinateWatcher();
        }
    }
}
 
}
