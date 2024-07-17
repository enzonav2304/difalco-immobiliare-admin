<template>
<b-row>
    <b-col>
        <div v-if="slider">
            <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="500"
                img-height="auto"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
            >
                <b-carousel-slide 
                    class="img" 
                    v-for="image in slider" 
                    v-bind:img-src="image"
                    :key="image"
                ></b-carousel-slide>

            </b-carousel>
            <p class="mt-4">
                Slide #: {{ slide }}<br>
                Sliding: {{ sliding }}
            </p>
            <!-- <div v-for="image in images">{{image}}</div>-->
        </div>
        <div v-else>
            <img :src="noimage" />
        </div>
    </b-col>
</b-row>    
</template>

<script>

import myR from '../../lib/js/funcsRamda.js'
import {mapGetters} from 'vuex'


export default {
    name: 'slider',
    data() {
        return {
            timer: null,
            currentIndex: 0,
            noimage: require('@/assets/imgs/noimage.jpg'),
            slide: 0,
            slider: null,
            sliding: null
        }
    },
    computed: {
        ...mapGetters({
            get_images: 'data_store/getImages'
        }),
        currentImg: function() {
            return this.slider[Math.abs(this.currentIndex) % this.slider.length]
        }              
    },
    created: function() {
        console.log('created slider')
        if(myR.isEmpty(this.get_images)) {
            console.log('empty imgs array')
            return this.slider = false
        } else {
            let temp = myR.arrayValue('url', this.get_images)
            console.log('array imgs lenght -> ' + myR.lengthObj(temp))
            return this.slider = temp
        }
    },
    mounted: function() {
        console.log('mounted slider')
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        startSlide: function() {
            this.timer = setInterval(this.next, 4000)
        },
        next: function() {
            this.currentIndex += 1
        },
        prev: function() {
            this.currentIndex -= 1
        }
    }
}
</script>

<style>
#carousel1 {
    width: 50% !important; /* or width: 100% !important; */
}
</style>