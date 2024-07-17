<template>
  <div class="card mb-4">
    <div class="card-body">      
      <div>
        <div class="container" align="center">
          <div class="file-selector">
            <div v-if="getTempAttachments.length > 0">
              <attachmentList :tempAttachments="getTempAttachments"/>
            </div>
            <div v-else>
              <div v-if="!emptyObjImg() || !imagesLoaded">
                <b-card title="Nessuna immagine trovata" body-class="text-center">
                  <b-card-text>
                    L'immobile selezionato non ha immagini associate 
                  </b-card-text>
                  <button @click="goDropBox()" class="btn btn-primary sm-2">Inserisci immagini</button>
                </b-card>
              </div>
              <div v-else-if="emptyObjImg()">
                <div class="row">
                  <div class="col-12" align-text="center"><b-card title="galleria immagini"></b-card></div>
                </div>
                <hr>
                <div class="row">
                  <div 
                    v-for="(image, key) in test()" :key="'image' + parseInt(key)">
                    <div class="col-md-4">
                      <img 
                        class="img-style" 
                        :src="image"
                      />
                      <a href="#" @click="deleteImage(image)">x</a>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-2 offset-3">
                    <b-button @click="goDropBox()" variant="primary" btn-block>Inserisci con drop box</b-button>
                  </div>
                  <div class="col-2">
                    <b-button @click="setComponent('view-item', true)" variant="primary" btn-block>Torna all'immobile</b-button>
                  </div>
                  <div class="col-2">
                    <b-button @click="setComponent('home', false)" variant="primary" btn-block>Torna al Pannello</b-button>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import attachmentList from './attachmentList'
import uploadIcon from './uploadIcon'
import funcs from '../../lib/js/funcs.js'
import myR from '../../lib/js/funcsRamda.js'

import { mapGetters } from 'vuex'

export default {
  name: 'DropboxSelector',
  components: {
    uploadIcon,
    attachmentList
  },
  data() {
    return {
      id: this.$route.params.id,
      imagesLoaded: false,
      tempAttachments: []
    }
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      console.log('emitting route action')
      vm.$root.$emit('router-name', vm.$route.name)
      next()
    })
  },
  computed: {
    images: function() {
      return this.$store.state.data_store.images
    },
    ...mapGetters({
      get_images: 'data_store/getImages'
    }),
    getTempAttachments: function() {
      return this.tempAttachments
    }
  },
  created: function() {
    console.log('created dropbox component')    
  },
  mounted() {
    console.log('mounted dropbox component')
    /*
    this.$store.watch(
      (state, getters) => this.get_images,
      (newValue, oldValue) => {                
        console.log('imgs store changed') 
        //console.log(this.images)
        if(myR.isNull(this.images) || myR.lengthObj(this.images) == 0) {
          console.log('images array null')
        } else {
          console.log('images array NOT null')
        }
      }
    )
    */
    /* dropbox popup */
    let dropBox = document.createElement('script')
    dropBox.setAttribute(
      'src',
      'https://www.dropbox.com/static/api/2/dropins.js'
    )
    dropBox.setAttribute('id', 'dropboxjs')
    dropBox.setAttribute('data-app-key', 'v7zv21y49tfahqe')
    document.head.appendChild(dropBox)   
  },
  methods: {
    test: function() {
      if(this.imagesLoaded) {
        return myR.arrayValue('url', this.get_images)
      }
    },
    deleteImage: function(_url) {
      console.log(_url)
      let payload = funcs.modalObj(
        'warning', 
        'Vuoi veramente cancellare immonbile?', 
        'Cancellazione avvenuta con successo', 
        'Cancellazione annullata'
      )
      const my_var = myR.returnImageId(this.get_images, _url)
      Object.assign(payload, {'id': my_var})
      Object.assign(payload, {'action': 'del_image'})
      this.$root.$emit('modal', payload)
      
    },
    emptyObjImg: async function () {
      if(myR.isEmpty(this.get_images)) {
        console.log('dropbox -> imageObj is empty')
        return false
      } else {
        console.log('dropbox -> imageObj is not empty')
        let temp = myR.arrayValue('url', this.get_images)
        console.log('temp:')
        console.log(temp)
        let imageLoaded = 0
        for (const imageSrc of temp) {  
          //console.log('into the for loop')  
          const img = new Image()
          img.src = imageSrc
          console.log(imageSrc)
          try {
            img.onload = () => {
              imageLoaded++
              if (imageLoaded === temp.length) {
                console.log('images loaded ' + imageLoaded)
                this.imagesLoaded = true
                //this.$root.$emit('loaded-img')
              }
            }
          } catch (e) {
            imageLoaded++
          }
        }
        console.log('end function')
        return true
      }
    },
    goDropBox() {
      let options = { /* Required. Called when a user selects an item in the Chooser. */
        success: async files => {
          let attachments = []
          let new_base_url = 'https://dl.dropboxusercontent.com'
          for (let i = 0; i < files.length; i++) {
            let attachment = {}
            let sub_string = funcs.stringObject(files[i].link, '/s', '?dl=0')
            let url = new_base_url + sub_string
            attachment.id_immobile = this.$route.params.id
            attachment.title = files[i].name
            attachment.size = files[i].bytes
            attachment.iconURL = files[i].icon
            attachment.url = url
            attachment.extension = `. ${files[i].name.split('.')[1]}`
            attachments.push(attachment)
          }
          this.tempAttachments = attachments
          console.log(this.tempAttachments)
        },
        cancel: function() {}, /* Optional. Called when the user closes the dialog without selecting a file and does not include any parameters. */
        linkType: 'preview',  /* or "direct". Optional. "preview" (default) is a preview link to the document for sharing, "direct" is an expiring 
                              link to download the contents of the file. For more information about link types, see Link types below. */
        multiselect: true, /* or true Optional. A value of false (default) limits selection to a single file, while true enables multiple file selection. */
        extensions: [ /* Optional. This is a list of file extensions. If specified, the user will only be able to select files with these extensions. You may also specify
                      file types, such as "video" or "images" in the list. For more information, ee File types below. By default, all extensions are allowed. */
          '.pdf',
          '.doc',
          '.docx',
          '.jpg',
          '.png',
          '.jpeg',
          '.svg',
          '.psd',
          '.sketch'
        ],
        folderselect: false,  /* or true Optional. A value of false (default) limits selection to files, while true allows the user to select both folders and files.
                              You cannot specify `linkType: "direct"` when using `folderselect: true`. */
        sizeLimit: 102400000  /* or any positive number Optional. A limit on the size of each file that may be selected, in bytes. If specified, the user will only be able to select files with size
                              less than or equal to this limit. For the purposes of this option, folders have size zero. */
      }
      Dropbox.choose(options)
    },
    setComponent: function (path, id) {
      if(arguments[1]) {
        this.$router.push('/' + path + '/' + this.$route.params.id)
      } else {
        this.$router.push('/' + path)
      }
      
    }
  }
}
</script>


<style scoped>

.button {
  background-color: #4CAF50 !important; /* Green */
}

.col-md-4 a {
  display: block;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 8px;
  left: 140px;
  /* background: #c00; */
  color: white;
  /* overflow: hidden; */
  /* text-indent: -9999px;*/
}
.img-style {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px;  /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px !important;
  height: 150px !important;
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
.preview{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	width: 100px;
}
.file-selector {
  padding: 55px;
  font-weight: 600;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #4e5b69;
  z-index: -9;
}
figure {
  margin: 0px;
}

.dropzone-container {
  display: flex;
  flex-direction: column;
  border: 1px dashed #ccc;
  border-radius: 15px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/*
button {
  background: #031629;
  box-shadow: 0 0 2px 0 rgba(3, 22, 41, 0.11), 0 6px 16px 0 rgba(3, 22, 41, 0.08);
  font-family: SFProDisplay-Regular;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0.4px;
  padding: 12px 30px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.25s;
}
*/

button:hover {
  background-color: #1587ea;
  border-color: transparent;
}
.separator {
  position: relative;
}
.separator:after {
  position: absolute;
  content: "";
  height: 1px;
  width: 200px;
  background: #d8d8d8;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
span {
  position: relative;
  background: #f9f9f9;
  padding: 0 4px;
  z-index: 9;
  font-size: 12px;
  color: #4e5b69;
}
</style>
