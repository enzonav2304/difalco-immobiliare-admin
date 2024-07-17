<template>
  <div>
    <ul v-if="!emptyArray">
      <li v-for="tempAttachment in tempAttachments" :key="tempAttachment._id">
        <img class="icon" :src="tempAttachment.iconURL">
        <div class="file-details">
          <div @click="openLink(tempAttachment.link)" class="file-name display-flex align-center">
            <p class ref="attachmentTitle">{{ tempAttachment.title }}</p>
          </div>
          <div class="file-info">
            <span class="uploaded-date">File Size : {{ tempAttachment.size }} bytes</span>
          </div>
        </div>
        <figure class="close">
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 14 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="Symbols"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <g id="list" transform="translate(-570.000000, -13.000000)" stroke="#4E677F">
                <g id="x-circle" transform="translate(571.000000, 14.000000)">
                  <g>
                    <circle id="Oval" cx="6" cy="6" r="6"></circle>
                    <path d="M7.8,4.2 L4.2,7.8" id="Path"></path>
                    <path d="M4.2,4.2 L7.8,7.8" id="Path"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </figure>
      </li>
    </ul>
    <div>
        <hr>
        <b-button @click="insertImgs()" variant="primary">Inserisci</b-button>
        <b-button variant="danger">&nbsp;&nbsp;Reset&nbsp;&nbsp;</b-button>
        <hr>
    </div>
  </div>
</template>

<script>

import funcs from '../../lib/js/funcs.js'

export default {
  name: "attachmentList",
  data () {
    return {
      img_data: {
        id_immobile: this.$route.params.id,
        title: null,
        size: null,
        extension: null,
        url: null,
        iconURL: null
      },
      emptyArray: this.tempAttachments < 1
    }
  }, 
  props: {
    tempAttachments: {
      type: Array
    }
  },
  methods: {
    insertImgs: async function () {      
      let x = this.tempAttachments
      let responses = []
      for (let item in x) {
        let response = await this.getOneResult(x[item])        
        responses.push(response)
        await this.pause(1000)
      }
      this.setComponent()       
      return responses      
    },
    getOneResult: function(item) {
      funcs.insertImages(item)
      console.log('ok')
      return Promise.resolve(item)
    },
    pause: function(time) {
      // handy pause function to await
      return new Promise(resolve => setTimeout(resolve, time))
    },
    openLink(attachmentLink) {
      let link = document.createElement("a")
      link.href = attachmentLink
      link.click()
    },  
    setComponent: function (_name, _mode) {
      funcs.fetchItemAll(funcs.objId(this.img_data.id_immobile))      
      this.$router.push({name: 'view-component', params: {id: this.id, mode: 'view-item'}})
      this.$store.commit('mutate', funcs.mutObj('view_mode', _mode))
    }
   
  }
}
</script>
<style>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
}
li {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 16px;
  width: 100%;
  text-align: left;
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(3, 22, 41, 0.11),
    0 6px 16px 0 rgba(3, 22, 41, 0.08);
  border-radius: 6px;
}
.file-name {
  min-width: 150px;
  font-size: 16px;
  cursor: pointer;
}
.file-name p {
  margin: 0;
}
.uploaded-date {
  font-size: 12px;
  font-weight: 300;
}
.upload-progress {
  font-size: 12px;
  font-weight: 300;
}
.file-details {
  flex: 1;
}
.file-info {
  display: flex;
  justify-content: space-between;
  margin: 0px;
}
.close {
  position: absolute;
  margin: 0px;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
  cursor: pointer;
}
.close:hover g {
  stroke: #41b883;
}
.icon {
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
</style>
