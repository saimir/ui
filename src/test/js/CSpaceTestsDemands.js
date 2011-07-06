/*
Copyright 2011 Museum of Moving Image

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, cspace:true*/
"use strict";

(function ($, fluid) {
    
    fluid.registerNamespace("cspace");
    
    fluid.demands("cspace.util.extractTenant.segment", ["cspace.localData" ,"cspace.test"], {
        options: {
            path: "test"
        }
    });
    
    // Record editor demands
    fluid.demands("afterDelete", ["cspace.recordEditor", "cspace.test"], {
        funcName: "cspace.tests.testAfterDelete",
        args: "{recordEditor}"
    });
    
    // Record list demands
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test"], {
        funcName: "cspace.tests.selectNavigate",
        args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocalTest"]
    });
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test", "person", "cspace.relatedRecordsList"], {
        funcName: "cspace.tests.selectNavigateVocab",
        args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocalTest"]
    });
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test", "location", "cspace.relatedRecordsList"], {
        funcName: "cspace.tests.selectNavigateVocab",
        args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocalTest"]
    });
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test", "organization", "cspace.relatedRecordsList"], {
        funcName: "cspace.tests.selectNavigateVocab",
        args: ["{recordList}.model", "{recordList}.options", "{recordList}.options.urls.navigateLocalTest"]
    });
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test", "cspace.tab"], {
        funcName: "cspace.recordList.selectFromList",
        args: ["{recordList}.model", "{recordList}.options", "{listEditor}.detailsDC"]
    });
    fluid.demands("select", ["cspace.recordList", "cspace.localData", "cspace.test", "cspace.users"], {
        funcName: "cspace.recordList.selectFromList",
        args: ["{recordList}.model", "{recordList}.options", "{listEditor}.detailsDC"]
    });
    
    // DataContext demands
    fluid.demands("detailsDC", ["cspace.listEditor", "cspace.localData", "cspace.test"], {
        options: {
            model: "{listEditor}.options.detailsModel",
            baseUrl: "../data",
            fileExtension: ".json",
            listeners: {
                modelChanged: {
                    listener: "{listEditor}.events.detailsModelChanged.fire",
                    priority: "last"
                }
            },
            recordType: "{listEditor}.options.recordType"
        }
    });
    fluid.demands("detailsDC", ["cspace.listEditor", "cspace.tab", "cspace.localData", "cspace.test"], {
        options: {
            model: "{listEditor}.options.detailsModel",
            baseUrl: "../data",
            fileExtension: ".json",
            listeners: {
                modelChanged: {
                    listener: "{listEditor}.events.detailsModelChanged.fire",
                    priority: "last"
                }
            }
        }
    });
    fluid.demands("detailsDC", ["cspace.listEditor", "cspace.test", "cspace.localData"], {
        options: {
            model: "{listEditor}.options.detailsModel",
            baseUrl: "../data",
            fileExtension: ".json",
            listeners: {
                modelChanged: {
                    listener: "{listEditor}.events.detailsModelChanged.fire",
                    priority: "last"
                }
            }
        }
    });
    
    fluid.demands("dataContext", ["cspace.test", "cspace.localData"], {
        options: {
            fileExtension: ".json"
        }
    });
    
    // DataSource demands
    fluid.demands("dataSource", ["cspace.tab", "cspace.localData", "cspace.test"], {
        options: {
            schema: "{dataContext}.options.schema"
        }
    });
    fluid.demands("dataSource", ["cspace.users", "cspace.localData", "cspace.test"], {
        options: {
            schema: "{dataContext}.options.schema",
            sources: {
                role: {
                    href: "../data/role/list.json",
                    path: "fields.role",
                    resourcePath: "items",
                    merge: "cspace.dataSource.mergeRoles"
                } 
            }
        }
    });

    // Messagebar demands
    fluid.demands("messageBar", "cspace.test", {
        container: "body"
    });
    
    // search demands
    fluid.demands("search", ["cspace.searchToRelateDialog", "cspace.localData", "cspace.test"], {
       container: "{searchToRelateDialog}.container"
    });
    
    // ListEditor demands
    fluid.demands("adminListEditor", ["cspace.userAdminTests", "cspace.admin", "cspace.localData", "cspace.test"], {
        container: "{admin}.container",
        options: {
            selectors: {
                allDetails: ".csc-admin-details"
            },
            selectorsToIgnore: ["allDetails"],
            recordType: "users",
            uispec: "{admin}.options.uispec",
            urls: {
                listUrl: "%chain/users/search?query=%query"
            },
            components: {
                listSearchSource: {
                    type: "cspace.listEditor.testUsersListSearchDataSource"
                }
            }
        }
    });
    fluid.demands("list", ["cspace.listEditor", "cspace.localData", "cspace.test", "cspace.admin", "cspace.users"], {
        container: "{listEditor}.dom.list",
        options: {
            recordType: "{listEditor}.options.recordType",
            columns: ["screenName", "status"],
            parentBundle: "{listEditor}.options.parentBundle",
            strings: {
                screenName: "User's Full Name",
                status: "Status",
                newRow: "Creating New User..."
            }
        }
    });
    fluid.demands("list", ["cspace.listEditor", "cspace.localData", "cspace.test"], {
        container: "{listEditor}.dom.list",
        options: {
            recordType: "{listEditor}.options.recordType",
            columns: ["screenName", "status"],
            parentBundle: "{listEditor}.options.parentBundle",
            strings: {
                screenName: "User's Full Name",
                status: "Status",
                newRow: "Creating New User..."
            }
        }
    });
    fluid.demands("cspace.listEditor.testUsersListSearchDataSource",  ["cspace.localData", "cspace.userAdminTests", "cspace.listEditor"], {
        funcName: "cspace.listEditor.testUsersListSearchDataSource",
        args: {
            targetTypeName: "cspace.listEditor.testUsersListSearchDataSource"
        }
    });
    fluid.demands("updateList", ["cspace.listEditor", "cspace.userAdminTests", "cspace.localData"], {
        funcName: "cspace.tests.updateListUsers",
        args: ["{listEditor}", "{admin}.dom.searchField", "{arguments}.0"]
    });
    fluid.demands("updateList", ["cspace.listEditor", "cspace.listEditorTests", "cspace.localData"], {
        funcName: "cspace.listEditor.updateList",
        args: ["{listEditor}", "{arguments}.0"]
    });
    fluid.demands("cspace.specBuilderImpl", "cspace.test", {
        spec: {
            async: false
        }
    });
    fluid.demands("cspace.urlExpander", ["cspace.localData", "cspace.test"],
        {
        args: {
            vars: {
                tenant: "..",
                chain: "..",
                webapp: "../../main/webapp/defaults",
                test: ".."
            }
        }
    });
    fluid.demands("mainSearch", "cspace.search.searchView", ["{searchView}.dom.mainSearch", fluid.COMPONENT_OPTIONS]);
    fluid.demands("structuredDate", "cspace.test", [".csc-structuredDate-container-field", "{options}"]);
    
})(jQuery, fluid);