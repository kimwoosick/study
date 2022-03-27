'use strict';
/** List Dropdown Js*/
$(document).ready(function () {
    const $container = $('.collapsable-container');
    let $child_target = null;
    let $root_target = null;
    $container.find('.root-depth > li').on('click', function (e) {
        $root_target = $(e.currentTarget);
        updateCollapsableUI($root_target);
        e.stopPropagation();
    });

    $container.find('.child-depth > li').on('click', function (e) {
        $child_target = $(e.currentTarget);
        location.href = $child_target.attr('data-href');
        e.stopPropagation();
    });
});

function updateCollapsableUI(target) {
    $('.root-depth > li').removeClass('active');
    $('.child-depth').each((index, elem) => {
        if ($(elem).css('display') !== 'none') {
            $(elem).slideUp();
        }
    });
    if (target.find('ul.child-depth').css('display') === 'none') {
        target.addClass('active')
        $('[data-slide-id="' + target.attr('data-slide-target') + '"]').slideDown();
    }
}

/** List Dropdown Js End */

/** Message Tabs Js */
$(document).ready(function () {
    $('#message-tab a[data-toggle="tab"]').on('shown.bs.tab', function (event) {
        event.relatedTarget // previous active tab
        event.target // newly activated tab
        const prev_container = $('#' + event.relatedTarget.getAttribute('aria-controls'));
        const container = $('#' + event.target.getAttribute('aria-controls'));
        container.find('.media-container').html('');
        prev_container.find('.media-container').html('');
        let datas;
        switch (event.target.getAttribute('aria-controls')) {
            case 'unread':
                /*TODO Fetch Data*/
                datas = [{}, {}, {}, {}, {}, {}];
                datas.forEach((datas, index) => {
                    container.find('.media-container').append(createMessageMedia({}));
                });
                $('.media-container [data-href]').click(locationF);
                break;
            default:
                /*TODO Fetch Data*/
                datas = [{}, {}, {}, {}, {}, {}];
                datas.forEach((datas, index) => {
                    container.find('.media-container').append(createProjectMedia({}));
                });
                $('.media-container [data-href]').click(locationF);
                break;
        }
    });
});

const createProjectMedia = (object) => {
    return `<div class="project-media project-type" data-href="../chat/chat-work.html">
                <div class="media-info">
                    <div class="media-title">
                        <span class="title text-red">Lorem ipsum</span>
                        <span class="date text-dark-low ml-auto mb-auto mt-1">2022.03.10</span>
                    </div>
                    <div class="media-body ellipsis-multi text-dark-low">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem
                        beatae
                        blanditiis culpa dicta enim hic, illum laboriosam mollitia neque nobis
                        officiis
                        possimus quas qui repellendus temporibus totam ullam unde!
                    </div>
                </div>
            </div>`;
};

const createMessageMedia = (object) => {
    return `<div class="message-media message-type" data-href="../chat/chat.html">
                <img class="media-profile mb-auto"
                     width="48"
                     height="48"
                     src="../../../resources/assets/images/sample/profile-sample-4.png"/>
                <div class="media-info my-auto">
                    <div class="media-title">
                        <span class="title text-dark-low">Lorem ipsum</span>
                        <span class="date text-dark-low ml-auto mb-auto mt-1">2022.03.10</span>
                    </div>
                    <div class="media-body ellipsis-multi text-gray-aa">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem
                        beatae
                        blanditiis culpa dicta enim hic, illum laboriosam mollitia neque nobis
                        officiis
                        possimus quas qui repellendus temporibus totam ullam unde!
                    </div>
                </div>
            </div>`;
};
/** Message Tabs Js End */

/** Input Box Icon Js */
$(document).ready(function () {
    $('.ri-input .ri-icon.write-icon').click(function (e) {
        let $target = $(e.currentTarget);
        let $container = $target.parent().parent();
        $container.find('.ri-input').attr('data-checked', true);
        /** Height Resize*/
        heightResize('increase', $target.parent());
    });

    $('.ri-input .ri-icon.check-icon').click(function (e) {
        let $target = $(e.currentTarget);
        let $container = $target.parent().parent().parent().parent();
        $container.find('.ri-input').attr('data-checked', false);
        /** Height Resize*/
        heightResize('decrease', $target.parent().parent().parent());
    });
    hashInputInit();
    $('[input-type="hash"]').keypress(function (e) {
        if ((e.keyCode == 13 || e.keyCode == 10) && (e.ctrlKey || e.shiftKey)) {
            let $target = $(e.currentTarget);
            if ($target.val().length > 0) {
                let span = document.createElement('span');
                span.classList.add('hash-item');
                span.classList.add('bg-gray-op-f2');
                span.innerHTML = createHashTag($target.val());
                $(span).find('.hash-close').on('click', function (e) {
                    let $c_target = $(e.currentTarget);
                    $c_target.parent().remove();
                });
                $target.parent().find('.hash-container').append(span);
                /** Height Resize*/
                heightResize('increase', $target.parent().parent().parent());
            }
        }
    });

    $('.ri-radio-type .radio-container .radio-item-wrapper .radio-item').click(function (e) {
        e.preventDefault();
        if (!$(e.target).parent().find('input[type="radio"]').prop('checked')) {
            $(e.target).parent().find('input[type="radio"]').prop('checked', true);
        } else {
            $(e.target).parent().find('input[type="radio"]').prop('checked', false);
        }
    });
    $('.isPublic .radio-item').click(function (e) {
        e.preventDefault();
        if (!$(e.target).parent().find('input[type="radio"]').prop('checked')) {
            $(e.target).parent().find('input[type="radio"]').prop('checked', true);
        } else {
            $(e.target).parent().find('input[type="radio"]').prop('checked', false);
        }
    });
});
const hashInputInit = () => {
    $('.hash-container .hash-item .hash-close').click(function (e) {
        $(e.currentTarget).parent().remove();
    });
}
const createHashTag = (text) => {
    return `<span class="hash my-auto">${text}</span>
            <span class="hash-close">
                <svg class="m-auto"
                     width="17"
                     height="17"
                     viewBox="0 0 17 17"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_920_11902)">
                        <path d="M8.32974 7.37489L11.6792 4.02539L12.6361 4.9822L9.28655 8.3317L12.6361 11.6812L11.6792 12.638L8.32974 9.2885L4.98024 12.638L4.02344 11.6812L7.37294 8.3317L4.02344 4.9822L4.98024 4.02539L8.32974 7.37489Z"
                              fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_920_11902">
                            <rect width="16.24"
                                  height="16.24"
                                  fill="white"
                                  transform="translate(0.210938 0.210938)"/>
                        </clipPath>
                    </defs>
                </svg>
            </span>`;
}

const heightResize = function (type, $container) {
    if (type === 'increase') {
        let height = $container.find('.update-container').outerHeight();
        $container.outerHeight(height);
    } else if (type === 'decrease') {
        if ($container.hasClass('ri-hash-type')) {
            let height = $container.find('.write-icon').outerHeight();
            height >= 84 ? $container.height(74) : $container.height(height);
        } else {
            let height = $container.find('.update-input').outerHeight();
            height >= 84 ? $container.height(74) : $container.height(height);
        }
    } else {
        new Error('Unknown type');
    }
};
/** Input Box Icon Js End*/

/** Chat*/
$(document).ready(function () {
    /** Chat User Profile Event */
    $('.left-chat-list .media-profile-wrapper img.media-profile').click(function (e) {
        let $target = $(e.currentTarget);
        let $chat_profile = $('.chat-profile-wrapper');

        setTimeout(function () {
            $chat_profile.find('.empty').fadeOut(500, 0);
        }, 500);

        if (!$chat_profile.hasClass('active')) {
            $chat_profile.addClass('active');
            $chat_profile.css('z-index', '-1');
            $chat_profile.animate({
                right: "-321px",
                opacity: 1,
            }, 500);
        }
    });

    $('.left-chat-list .chat-profile-wrapper .rt-pos').click(function (e) {
        let $target = $(e.currentTarget);
        let $chat_profile = $('.chat-profile-wrapper');

        if ($chat_profile.hasClass('active')) {
            $chat_profile.removeClass('active');
            $chat_profile.animate({
                right: "0",
                opacity: 0,
            }, 500);
            $chat_profile.promise().done(() => {
                $chat_profile.css('z-index', '-1');
            });
        }
    });
    /** Chat User Profile Event End */
    /** Chat Work Status Dropdowns */
    $('.work-status-container .title-wrapper .rt-pos').click(function (e) {
        let $target = $(e.currentTarget);
        let $wrapper = $('.work-status-body-wrapper');
        let $title = $('.work-status-simple-info-wrapper');
        if (!$target.hasClass('active')) {
            $target.addClass('active');
            $title.slideUp(200);
            $wrapper.slideDown(200);
        } else {
            $target.removeClass('active');
            $wrapper.slideUp(200);
            $title.slideDown(200);
        }
    });
    /** Chat Work Status Dropdowns End */

    /** Chat Textarea Event */
    $('.input-wrapper textarea').on('keypress', function (e) {
        if ((e.keyCode == 13 || e.keyCode == 10) && !(e.ctrlKey || e.shiftKey)) {
            /** Send Message*/
            clearMessage(e);
        } else if ((e.keyCode == 13 || e.keyCode == 10) && (e.ctrlKey || e.shiftKey)) {
            /** Enter Message*/
        } else {
            /** Other Keys*/
        }
    });

    $('.input-wrapper textarea').on('keyup', function (e) {
        updateSendBtn(e);
    });
    /** Chat Textarea Event End*/
});
const updateSendBtn = (e) => {
    let $target = $(e.currentTarget);
    if ($target.val().trim().length > 0) {
        $target.parent().parent().find('button').removeAttr('disabled');
    } else {
        $target.parent().parent().find('button').attr('disabled', 'disabled');
    }
}
const clearMessage = (e) => {
    let $target = $(e.currentTarget);
    $target.val('');
    e.preventDefault();
    e.stopPropagation();
}
/** Chat End*/

/** Header Alarm And Search */
$(document).ready(function () {
    $('#alarm').on('click', viewAlarm);
    $('#search').on('click', viewSearch);
    $('#profile').on('click', viewProfile);
});

const viewProfile = (e) => {
    let $target = $(e.currentTarget);
    let position = getPosition($target);
    let $overlay = $('.header-message-tab-overlay');
    let $tab = $('.profile-tab');

    if ($tab.css('display') === 'none') {
        updateView($tab, $overlay, 'show');
        updatePosition($tab, $overlay, position);
    } else {
        updateView($tab, $overlay, 'hide');
        $tab.slideUp(200);
    }
    e.stopPropagation();
}

const viewAlarm = (e) => {
    let $target = $(e.currentTarget);
    let position = getPosition($target);
    let $overlay = $('.header-message-tab-overlay');
    let $tab = $('.message-tab');

    if ($tab.css('display') === 'none') {
        updateView($tab, $overlay, 'show');
        updatePosition($tab, $overlay, position);
    } else {
        updateView($tab, $overlay, 'hide');
        $tab.slideUp(200);
    }
    e.stopPropagation();
}

const viewSearch = (e) => {
    let $target = $(e.currentTarget);
    let position = getPosition($target);
    let $overlay = $('.header-message-tab-overlay');
    let $tab = $('.search-tab');

    if ($tab.css('display') === 'none') {
        updateView($tab, $overlay, 'show');
        updatePosition($tab, $overlay, position);
    } else {
        updateView($tab, $overlay, 'hide');
        $tab.slideUp(200);
    }
    e.stopPropagation();
}

const updateView = (e, $overlay, status) => {
    if (status === 'show') {
        let $hide_target;
        if (e.hasClass('search-tab')) {
            $hide_target = $('.message-tab');
            $hide_target.slideUp(200);

            $hide_target = $('.profile-tab');
            $hide_target.slideUp(200);

        } else if (e.hasClass('message-tab')) {
            $hide_target = $('.search-tab');
            $hide_target.slideUp(200);

            $hide_target = $('.profile-tab');
            $hide_target.slideUp(200);
        } else if (e.hasClass('profile-tab')) {
            $hide_target = $('.message-tab');
            $hide_target.slideUp(200);

            $hide_target = $('.search-tab');
            $hide_target.slideUp(200);
        }
    } else if (status === 'hide') {
        closeView();
    }
}

const closeView = (type) => {
    let $overlay = $('.header-message-tab-overlay');
    if (type === undefined || type === null) {
        let $search_tab = $('.search-tab');
        if ($search_tab.css('display') === 'block') {
            $search_tab.slideUp(200);
        }

        let $message_tab = $('.message-tab');
        if ($message_tab.css('display') === 'block') {
            $message_tab.slideUp(200);
        }

        let $profile_tab = $('.profile-tab');
        if ($profile_tab.css('display') === 'block') {
            $profile_tab.slideUp(200);
        }
        $overlay.hide();
    } else {
        if (type === 'message') {
            let $message_tab = $('.message-tab');
            if ($message_tab.css('display') === 'block') {
                $message_tab.slideUp(200);
            }
        } else if (type === 'search') {
            let $search_tab = $('.search-tab');
            if ($search_tab.css('display') === 'block') {
                $search_tab.slideUp(200);
            }
        } else if (type === 'profile') {
            let $profile_tab = $('.profile-tab');
            if ($profile_tab.css('display') === 'block') {
                $profile_tab.slideUp(200);
            }
        }
    }
}


const getPosition = ($e) => {
    return {x: $e.offset().left, y: $e.offset().top, l: 60}
}


const updatePosition = ($tab, $overlay, position) => {
    $tab.css('left', position.x);
    $tab.css('top', position.y + position.l - $(window).scrollTop());
    $overlay.show();
    $tab.slideDown(200);
}

$(document).click(function (e) {
    let $message_target = $('.message-tab');

    if ($message_target.has(e.target).length !== 0) {
        closeView('search');
        closeView('profile');
    }

    let $search_target = $('.search-tab');
    if ($search_target.has(e.target).length !== 0) {
        closeView('message');
        closeView('profile');
    }

    let $profile_target = $('.profile-tab');
    if ($profile_target.has(e.target).length !== 0) {
        closeView('message');
        closeView('search');
    }

    if ($search_target.has(e.target).length === 0 && $message_target.has(e.target).length === 0 && $profile_target.has(e.target).length === 0) {
        closeView();
    }
});
/** Header Alarm And Search End */

/**Video*/
$(document).ready(function () {
    $('.video-container').on('contextmenu', function (e) {
        e.preventDefault();
    });

    let options = {autoplay: false};

    let video;
    video = videojs('my-video', options, function onPlayerReady() {
        console.log(this);
        console.log('video play ready callback');
        // In this context, `this` is the player that was created by Video.js.
        //this.play();
        // How about an event listener?
        this.on('ended', function () {
            console.log('video play end work callback');
        });
    });

    video.ready(function () {
        this.hotkeys({
            volumeStep: 0.1, //10% sound control
            seekStep: 10, //10fps next or prev control
            enableModifiersForNumbers: false
        });
    });
});

/**Change Video Src*/
const changeVideo = (element) => {
    element.src({
        type: 'video/mp4',
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    });
}

/**Video End*/

/** Project Modal Radio Event */
$("input[name='process']:radio").change((e) => {
    //라디오 버튼 값을 가져온다.
    let $step_item = $(e.currentTarget).parent().parent().parent();
    let $step_wrapper = $step_item.parent();
    $step_wrapper.find('.step-item .step-process-inner').slideUp(200);
    $step_item.find('.step-process-inner').slideDown(200);
});
/** Project Modal Radio Event End*/

/** Data Href, Data Modal Open */
$(document).ready(function () {
    $('[data-href]').click(locationF);
    $('[data-modal-id]').click(openModal);
    $('[data-modal-reopen-id]').click(reOpenModal);
});

const locationF = (e) => {
    let href = $(e.currentTarget).attr('data-href');
    location.href = href;
}

const openModal = (e) => {
    let modal_id = $(e.currentTarget).attr('data-modal-id');
    $('#' + modal_id).modal('show');
}

const reOpenModal = (e) => {
    let modal_id = $(e.currentTarget).attr('data-modal-reopen-id');
    $('#' + modal_id).modal('hide');
    /** TODO Project Modal Data */
    setTimeout(() => {
        $('#' + modal_id).modal('show');
    }, 500);
}
/** Data-Href */

/** Input Auto Complete */
$(document).ready(function () {
    $('input').attr('autocomplete', 'off');
});
/** Input Auto Complete End*/