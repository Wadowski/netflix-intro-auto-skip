MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const PLAYER_CLASSNAME = 'NFPlayer';
const SKIP_BUTTON_CLASSNAME = 'skip-credits';
const CHILD_LIST_MUTATION_TYPE = 'childList';

const isChildListModified = ({ type }) => type === CHILD_LIST_MUTATION_TYPE;

const findSkipButton = ({ addedNodes }) => {
    let skipButton = null;
    addedNodes.forEach((node) => {
        if (node.classList.contains(SKIP_BUTTON_CLASSNAME)) {
            skipButton = node;
        }
    });

    return skipButton;
};

const skipIntroAction = ({ childNodes }) => {
    childNodes[0].click();
};

const playerObserver = new MutationObserver(function(mutations, observer) {
    mutations.forEach((mutation) => {
        if (isChildListModified(mutation)) {
            const skipButton = findSkipButton(mutation);

            if (skipButton) {
                skipIntroAction(skipButton);
            }
        }
    });
});

const documentObserver = new MutationObserver(function(mutations, observer) {
    const player = document.getElementsByClassName(PLAYER_CLASSNAME);
    if (player && player.length) {
        observer.disconnect();

        playerObserver.observe(player[0], {
            subtree: true,
            attributes: true,
            childList: true,
        });
    }
});

documentObserver.observe(document, {
    subtree: true,
    attributes: true,
});
