/*

Copyright 2010, Google Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

    * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
    * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,           
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY           
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var html = "text/html";
var encoding = "UTF-8";
var ClientSideResourceManager = Packages.com.google.refine.ClientSideResourceManager;

/*
 * Function invoked to initialize the extension.
 */
function init() {
	Packages.com.google.refine.exporters.ExporterRegistry.registerExporter(
	      "oracle", new Packages.com.clarabridge.refine.exporters.OracleExporter());
	
	var RS = Packages.com.google.refine.RefineServlet;
    RS.cacheClass(Packages.com.clarabridge.refine.oracle.operations.SaveServerSettingsOperation$ServerSettingsChange);

	RS.registerCommand(module, "save-server-settings",       new Packages.com.clarabridge.refine.oracle.commands.SaveServerSettings());
	
	var OR = Packages.com.google.refine.operations.OperationRegistry;
    OR.registerOperation(module, "save-server-settings-operation",  Packages.com.clarabridge.refine.oracle.operations.SaveServerSettingsOperation);
	
	Packages.com.google.refine.model.Project.
        registerOverlayModel("oracleServerSettings", Packages.com.clarabridge.refine.oracle.ServerSettings);
    
    // Script files to inject into /project page
    ClientSideResourceManager.addPaths(
        "project/scripts",
        module,
        [
            "scripts/project-injection.js",

            "scripts/dialogs/oracle-connection/dialog.js"
        ]
    );
    
    // Style files to inject into /project page
    ClientSideResourceManager.addPaths(
        "project/styles",
        module,
        [
            "styles/project-injection.less",

            "styles/dialogs/freebase-loading-dialog.less",
            "styles/dialogs/extend-data-preview-dialog.less",
            "styles/dialogs/schema-alignment-dialog.less"
        ]
    );
}

/*
 * Function invoked to handle each request in a custom way.
 */
function process(path, request, response) {
    // Analyze path and handle this request yourself.
    
    if (path == "/" || path == "") {
        var context = {};
        
        send(request, response, "index.vt", context);
    }
}

function send(request, response, template, context) {
    butterfly.sendTextFromTemplate(request, response, context, template, encoding, html);
}
