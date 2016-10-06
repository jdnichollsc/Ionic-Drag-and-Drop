(function (TweenLite, Draggable) {
    'use strict';

    angular
        .module('App')
        .directive('draggable', draggable);

    draggable.$inject = ['$ionicGesture'];
    function draggable($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var dragger;
                var animation;

                $ionicGesture.on('hold', function (e) {

                    animation = TweenLite.to(element, 0.3, {
                        boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
                        force3D: true,
                        scale: 1.1
                    });
                    dragger = new Draggable(element, {
                        type: "y",
                        bounds: element.parent()[0],
                        edgeResistance: 1,
                        onPress: sortablePress,
                        onRelease: sortableRelease,
                        onDragStart: sortableDragStart,
                        onDrag: sortableDrag,
                        liveSnap: sortableSnap,
                        onDragEnd: sortableDragEnd
                    });
                    TweenLite.set(element, { color: "#88CE02" });
                }, element, { hold_threshold: 20 });

                function sortablePress() {
                    var t = this.target,
                        i = 0,
                        child = t;
                    while (child = child.previousSibling)
                        if (child.nodeType === 1) i++;
                    t.currentIndex = i;
                    t.currentHeight = t.offsetHeight;
                    t.kids = [].slice.call(t.parentNode.children); // convert to array       
                }

                function sortableDragStart() {
                    this.update();
                }

                function sortableDrag() {
                    var t = this.target,
                        elements = t.kids.slice(), // clone
                        indexChange = Math.round(this.y / t.currentHeight),
                        bound1 = t.currentIndex,
                        bound2 = bound1 + indexChange;
                    if (bound1 < bound2) { // moved down
                        TweenLite.to(elements.splice(bound1 + 1, bound2 - bound1), 0.15, { yPercent: -100 });
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    } else if (bound1 === bound2) {
                        elements.splice(bound1, 1);
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    } else { // moved up
                        TweenLite.to(elements.splice(bound2, bound1 - bound2), 0.15, { yPercent: 100 });
                        TweenLite.to(elements, 0.15, { yPercent: 0 });
                    }
                }

                function sortableSnap(y) {
                    var h = this.target.currentHeight;
                    return Math.round(y / h) * h;
                }

                function sortableDragEnd() {
                    var t = this.target,
                        max = t.kids.length - 1,
                        newIndex = Math.round(this.y / t.currentHeight);
                    newIndex += (newIndex < 0 ? -1 : 0) + t.currentIndex;
                    if (newIndex === max) {
                        t.parentNode.appendChild(t);
                    } else {
                        t.parentNode.insertBefore(t, t.kids[newIndex + 1]);
                    }
                    TweenLite.set(t.kids, { yPercent: 0, overwrite: "all" });
                    TweenLite.set(t, { y: 0, color: "" });
                    animation.reverse();
                    dragger.kill();
                }

                function sortableRelease() {

                }
            }
        };
    }
})(TweenLite, Draggable);