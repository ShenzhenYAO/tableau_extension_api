
(async () => {

    // change page title
    d3.select("title").text("Getting Tableau Data")

    // listen to when document is ready
    $(document).ready(() => {
        console.log("document is ready...")
        // when the sync is done
        tableau.extensions.initializeAsync().then(() => {
            let n_sheets = tableau.extensions.dashboardContent.dashboard.worksheets.length
            console.log('number of sheets', n_sheets)
        }) // tableau.extensions.initializeAsync().then        
    }) // $(document).ready(function () 

})()