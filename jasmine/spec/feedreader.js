/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // Test suite ' The Menu' 
    describe('The menu', () => {
        //test that ensures the menu element is hidden by default.
        // using document.body for fast result check :
        // https://stackoverflow.com/questions/34745048/which-method-is-faster-to-select-body-element
        let body = document.body;
        let menu = document.querySelector('.menu-icon-link');

        it('Hidden by default', () => {
            expect(body.classList).toContain('menu-hidden');
        });
        
        // test that ensures the menu changes visibility when the menu icon is clicked
        it('Hide and display menu by click', () => {
            menu.click();
            expect(body.classList).not.toContain('menu-hidden');
            menu.click();
            expect(body.classList).toContain('menu-hidden');
        });
    });

   // test that ensures when the loadFeed function is called and completes its work, there is at least a single entry.
    describe('Initial Entries', () => {
        let feed = document.querySelector('.feed').getElementsByClassName('entry');

        beforeEach((done)=> {
            loadFeed(0, () => {
                done();
            });
        });
        it('Contain at least single entry', ((done) => {
            expect(feed.length).toBeGreaterThan(0);
            done();
        }));
    });
    
    // test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
    
    describe('New Feed Selection', () => {
        let myFeed;
        let newFeed = document.querySelector('.feed').innerHTML;

        beforeEach((done) => {
            loadFeed(0, () => {
                myFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    done();
                });
            });
        });
        it('Feed is loaded and the content is changed', ((done) => {
            expect(myFeed).not.toBe(newFeed);
            done();
        }));
    });
}());
