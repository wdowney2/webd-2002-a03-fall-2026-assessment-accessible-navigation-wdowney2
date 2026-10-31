//Add your JS here for your menu



(function () {
    "use strict";

    const triggers = Array.from(document.querySelectorAll(".nav-trigger"));

    function closeAllExcept(exceptTrigger) {
        triggers.forEach((trigger) => {
            if (trigger !== exceptTrigger && trigger.getAttribute("aria-expanded") === "true") {
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

        item.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
                setOpen(trigger, panel, false);
                trigger.focus();
            }
        });
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
