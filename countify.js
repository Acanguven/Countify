'use strict';

function cssonlycountdown(_className, _elements) {
    var setup = function(elements) {
        var gmt = -3;
        for (var x = 0; x < elements.length; x++) {
            var classN = ("coc-ins-" + x);

            elements[x].className += (" " + classN + " coc");

            var threshold = -0.03;
            var timeStringPreParsed = elements[x].getAttribute("coc");
            var timeInt = (new Date(timeStringPreParsed)).getTime();
            var remainingTime = timeInt - Date.now();

            var secondsRemains = (60 - ((remainingTime / 1000) % 60));
            var secondsOnesRemains = secondsRemains % 10;
            var secondsTensRemains = Math.floor(secondsRemains / 10) * 10 + (secondsOnesRemains + threshold);
            document.styleSheets[0].addRule("." + classN + ' .secondsOnes::before', 'animation-delay: -' + secondsOnesRemains.toString() + 's');
            document.styleSheets[0].addRule("." + classN + ' .secondsTens::before', 'animation-delay: -' + secondsTensRemains.toString() + 's');

            var minutesRemains = (60 - ((remainingTime / (1000 * 60)) % 60));
            var minutesOnesRemains = (minutesRemains % 10) * 60;
            var minutesTensRemains = Math.floor(minutesRemains / 10) * 600 + minutesOnesRemains;

            document.styleSheets[0].addRule("." + classN + ' .minutesOnes::before', 'animation-delay: -' + minutesOnesRemains.toString() + 's');
            document.styleSheets[0].addRule("." + classN + ' .minutesTens::before', 'animation-delay: -' + minutesTensRemains.toString() + 's');

            var hoursRemains = remainingTime / (1000 * 60 * 60) + gmt;

            if (hoursRemains < 1) {
                document.styleSheets[0].addRule("." + classN + ' .hours', 'display:none !important');
                document.styleSheets[0].addRule("." + classN + ' .hourSep', 'display:none !important');
            }

            var hoursRemainsText = (24 - hoursRemains % 24) * 60 * 60;
            document.styleSheets[0].addRule("." + classN + ' .hours::before', 'animation-delay: -' + hoursRemainsText.toString() + 's');

            var daysRemains = remainingTime / (((1000 * 60 * 60) + gmt) * 24);
            if (daysRemains >= 10) {
                daysRemains = 10;
                document.styleSheets[0].addRule("." + classN + ' .days .plusDays', 'display:inline !important');
            }

            var daysRemainsText = (10 - daysRemains % 10) * 60 * 60 * 24;
            document.styleSheets[0].addRule("." + classN + ' .days::before', 'animation-delay: -' + daysRemainsText.toString() + 's');

            if (daysRemains < 1) {
                document.styleSheets[0].addRule("." + classN + ' .days', 'display:none !important');
                document.styleSheets[0].addRule("." + classN + ' .hourText', 'display:inline !important');
                document.styleSheets[0].addRule("." + classN + ' .hourSep', 'display:none !important');
            }

            appendChilds(elements[x]);
        }
    };

    var appendChilds = function(el) {
        el.innerHTML = '<span class="days hideAfter"><span class="plusDays">+</span>&nbsp;gün</span><span class="hours"><span class="hourText">&nbsp;saat&nbsp;</span></span><span class="hourSep">:</span><span class="minutesTens"></span><span class="minutesOnes"></span><span>:</span><span class="secondsTens"></span><span class="secondsOnes"></span>';
    };

    if (_className) {
        setup(document.getElementsByClassName("cssonlycount"));
    } else if (_elements) {
        setup(_elements);
    }

}
