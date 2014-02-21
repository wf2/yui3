function () {

            /**
            * Test for gimpy Android, which below 3.0 doesn't support
            * overflow: auto properly, or possibly any other browser
            * that doesn't scroll inner content
            */

            var doc     = Y.config.doc,
              node      = doc ? doc.documentElement : null,
              isTouch   = Y.UA.touchEnabled;

            // Feature detection for iOS 5
            if ((node && 'WebkitOverflowScrolling' in node.style ||

                  // Touch events aren't supported and screen width is greater than X
                  // ...basically, this is a loose "desktop browser" check.
                  // It may wrongly opt-in very large tablets with no touch support.
                  (!isTouch && screen.width > 1200) ||

                  // Some ugly UA sniffing for Android below version 3,
                  // Webkit version testing because some Android browsers do not
                  // report they are Android. I wish there was a better way...
                  (Y.UA.android >= 3 || Y.UA.webkit >= 534)
                ) ||

              // Is not a touch device
              !isTouch) {

              return false;
            } else {

              return true;
            }
          }
