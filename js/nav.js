//Add your JS here for your menu



(function () {
    "use strict";

    const triggers = Array.from(document.querySelectorAll(".nav-trigger"));

    function closeAllExcept(exceptTrigger) {
        triggers.forEach((trigger) => {
            if (trigger !== exceptTrigger && trigger.getAttribute("aria-expanded") === "true" && trigger.contains(exceptTrigger)) { /* I'm very curious to see how the others make the menu function if I had to write Javascript we haven't learned yet to make it work */
                setOpen(trigger, panelFor(trigger), false);
            }
        });
    }

    function panelFor(trigger) {
        return document.getElementById(trigger.getAttribute("aria-controls"));
    }
    function setOpen(trigger, panel, open) {
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        panel.hidden = !open;
    }

    function initDisclosure(trigger, panel) {
        const item = trigger.closest(".nav-item");

        trigger.addEventListener("click", () => {
            const isOpen = trigger.getAttribute("aria-expanded") === "true";
            if (isOpen) {
                setOpen(trigger, panel, false);
            } else {
                closeAllExcept(trigger);
                setOpen(trigger, panel, true);
            }
        });

        if (item) {
            item.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
                    setOpen(trigger, panel, false);
                    trigger.focus();
                }
            });
        } else if (trigger.getAttribute("aria-controls") === "main-nav") {
            trigger.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
                    setOpen(trigger, panel, false);
                    trigger.focus();
                }
            });
        }
    }

    triggers.forEach((trigger) => initDisclosure(trigger, panelFor(trigger)));


    document.addEventListener("click", (event) => {
        triggers.forEach((trigger) => {
            const panel = panelFor(trigger);
            const clickedOutside = !trigger.contains(event.target) && !panel.contains(event.target);
            if (clickedOutside && trigger.getAttribute("aria-expanded") === "true") {
                setOpen(trigger, panel, false);
            }
        });
    });

})();
