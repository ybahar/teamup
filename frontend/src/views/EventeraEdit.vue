<template>
  <section class="eventera-edit">
      <div class="bg_img"></div>
      <div class="form_wrapper">
        <div class="form_container">
          <div class="title_container">
            <h2>Plan your event</h2>
          </div>
          <form @submit.prevent="saveEventera">
            <div class="row clearfix">
              <div class="col_half">
                <label>Title</label>
                <div class="input_field">
                  <input
                    type="text"
                    v-model="eventera.name"
                    placeholder="Title"
                    required
                  />
                  <label class="file-input-label">
                    <span v-if="isLoading">Uploading</span>
                    <span v-else>
                      Upload 3 images - 📁
                      </span> 
                    <input
                    type="file"
                    @change="handleUploadImage"
                    id="img-input"
                    class="img-file"
                    placeholder="Title"
                    multiple
                  />
                  </label>
                </div>
              </div>
              <div class="col_half">
                <label>
                  Enter event location / GPS:
                  <span class="GPS-pin" @click.prevent="getLocation">📌</span>
                </label>
                <div class="input_field">
                  <input
                    type="text"
                    name="location"
                    v-model="eventera.loc.city"
                    placeholder="City: Ramat-Gan"
                  />
                  <input
                    type="text"
                    name="location"
                    v-model="eventera.loc.address"
                    placeholder="Address: Habonim 6"
                  />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div class="col_half">
                <label>Categories</label>
                <div class="input_field">
                  <select class="category-select" v-model="categoryList" multiple required>
                   <option v-for="category in categories" :key="category" :value="category">{{category}}</option>
                  </select>
                  <input
                    class="input-number"
                    type="number"
                    v-model="eventera.maxMembers"
                    placeholder="Maximum number of particpiants"
                    required
                  />
                </div>
              </div>
              <div class="col_half">
                <label>Date & Time</label>
                <div class="input_field">
                  <input type="date" class="date" max="2030-03-31" v-model="expireDate" required />
                  <input type="time" class="time" v-model="expireTime" required />
                </div>
              </div>
            </div>
            <div class="row clearfix">
              <div>
                <label>Your description</label>
                <div class="textarea_field">
                  <textarea
                    cols="46"
                    rows="3"
                    v-model="eventera.description"
                    name="comments"
                    maxlength="400"
                    placeholder="Not required"
                  ></textarea>
                </div>
              </div>
            </div>
            <input class="button" :disabled="isLoading" type="submit" value="Sumbit" />
          </form>
        </div>
      </div>
  </section>
</template>

<script>
import alertService from '@/services/AlertService'
export default {
  data() {
    return {
      eventera: {
        name: "",
        loc: {
          geo: {
            lat: null,
            lng: null
          },
          city: "",
          address: ""
        },
        imgUrls: [],
      description: "",
      },
      categoryList: [],
      expireTime: "",
      expireDate: "",
      maxMembers: 0
    };
  },
  computed:{
    categories(){
      return this.$store.getters.categories
    },
    isLoading(){
      return this.$store.getters.isLoading
    }
  },
  methods: {
    async handleUploadImage(ev) {
            let fileObj = ev.target.files
            let res = Object.keys(fileObj).map(key => {
                return [fileObj[key]];
            });
            
            if(res.length > 3) res = res.splice(0, 3);
            this.eventera.imgUrls = await  this.$store.dispatch("uploadToCloud", res);
        },
    getLocation() {
      if (!navigator || !navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        this.setGeo,
        err => console.warn(err),
        { enableHighAccuracy: true }
      );
    },
    setGeo({ coords }) {
      this.eventera.loc.geo.lat = coords.latitude;
      this.eventera.loc.geo.lng = coords.longitude;
    },
    async saveEventera() {
      if(this.isLoading) return setTimeout(this.saveEventera,1000)
      this.eventera.categories = this.categoryList;
      let expireAt = new Date(
        this.expireDate + ":" + this.expireTime
      ).getTime();
      if(isNaN(expireAt)){
        expireAt = await this.$store.dispatch('checkTime',this.expireDate + ":" + this.expireTime)
      }
      if(expireAt < Date.now()) return alertService.err('Invalid time','Please input a date in the future')
      this.eventera.expireAt = expireAt;
      let {_id} = await this.$store.dispatch("saveEventera", this.eventera);
      this.$router.push(`/eventera/${_id}`)
    },
    setTimes(date) {
      //format time and date strings to confirm to input rules

      this.expireTime = date
        .toLocaleTimeString("he-il")
        .split(":")
        .map(t => {
          if (+t && +t < 10) return "0" + t;
          else return t;
        })
        .join(":");
      this.expireDate = date
        .toLocaleDateString("he-il")
        .split(".")
        .reverse()
        .map(t => {
          if (+t < 10) return "0" + t;
          else return t;
        })
        .join("-");
    }
  },
  async created() {
    if (this.$route.params.id) {
      let _id = this.$route.params.id;
      let eventera = await this.$store.dispatch({
        type: "getEventeraById",
        _id
      });
      this.eventera = eventera;
      this.categoryList = eventera.categories;
      let expirationDate = new Date(eventera.expireAt);
      this.setTimes(expirationDate);
    } else {
      let newEventera = this.$store.getters.getNewEventera;
      this.eventera.name = newEventera.name;
    }
  }
};
</script>

<style lang="scss" scoped src='@/styles/views/_EventeraEdit.scss'>
</style>
