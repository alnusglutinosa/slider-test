"use strict";

;(function() {
  var d = document,
  w = window,
  sliderNode = d.querySelector('#slider'),
  URL = 'img/';

  var slider = {
    _index: 0,
    el: sliderNode,
    sliderImagesCollection: [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg'
  ],
    sliderNodesCollection: [

  ],
    next: function() {
      var next = this._index + 1;

      if (this.sliderNodesCollection[next]) {
        this._index++;
      } else {
        this._index = 0;
      }

      this.showSlide();
    },
    prev: function() {
      var prev = this._index - 1;

      if (this.sliderNodesCollection[prev]) {
        this._index--;
      } else {
        this._index = this.sliderNodesCollection.length - 1;
      }

      this.showSlide();
    },
    show: function() {
      var first = this.sliderNodesCollection[this._index];
      this.el.appendChild(first);
      this.createControls();

      this.el.addEventListener('mouseover', function(e) {
        this._left.classList.add('show');
        this._right.classList.add('show');
      }.bind(this));

      this.el.addEventListener('mouseout', function(e) {
        this._left.classList.remove('show');
        this._right.classList.remove('show');
      }.bind(this));

      this.el.classList.remove('hide');
    },

    showSlide: function() {
      this.el.replaceChild(this.sliderNodesCollection[this._index], this.el.querySelector('.slide'));
    },

    load: function() {
      preloading.call(this, this.sliderImagesCollection)
    },
    createControls: function() {
      this._left = d.createElement('span');
      this._right = d.createElement('span');

      this._left.classList.add('arrow');
      this._right.classList.add('arrow');
      this._left.classList.add('left');
      this._right.classList.add('right');

      this.el.appendChild(this._left);
      this.el.appendChild(this._right);

      this._right.addEventListener('click', function(e) {
        this.prev();
      }.bind(this));

      this._left.addEventListener('click', function(e) {
        this.next();
      }.bind(this));

    }
  };

  function getUrl(name) {
    return URL + name;
  }

  function getSlideNode(url, callback) {
    var img = d.createElement('img');

    if(callback && callback.call) {
      img.onload = callback;
    }
    img.classList.add('slide');
    img.src = url;
    return img;
  }

  function preloading(collection) {
    var countAll = collection.length,
        count = 0,
        me = this;

    collection.forEach(function(name) {
      me.sliderNodesCollection.push(getSlideNode(getUrl(name), function() {
        count++;

        if(checkedCountSlide()) {
          //img = null;
          slider.show();
        }
      }));
    });

    function checkedCountSlide() {
      return countAll === count;
    }
  }

  w.onload = function() {
    slider.load();
  }

})();
