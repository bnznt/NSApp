<template>
  <Page>
    <ActionBar title="iTube" />
    <!-- <TabView>
      <TabViewItem title="Playground">
        <StackLayout
          style="background: #1C2541"
        >
          <Button dock="bottom" :text="isPlaying ? 'Pause' : 'Play'" @tap="handleBtnClick" class="btn-primary" />
          <ScrollView orientation="vertical">
            <StackLayout
              orientation="vertical"
            >
              <FlexboxLayout
                v-for="item of videoList"
                :key="item.id"
                height="100"
                color="white"
                marginBottom="10"
                @tap="loadAudio(item.id)"
                padding="0 10"
              >
                <Image
                  :src="item.snippet.thumbnails.high.url"
                  width="150"
                  marginRight="10"
                />
                <Label :text="item.snippet.title" padding="0" :textWrap="true" width="200" fontSize="10" />
              </FlexboxLayout>
            </StackLayout>
          </ScrollView>
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Account">
        <StackLayout class="p-20">
          <Button text="Login" @tap="onLoginTap()" class="btn btn-primary btn-active"/>
          <Button text="Logout" @tap="onLogoutTap()" class="btn btn-primary btn-active"/>
        </StackLayout>
      </TabViewItem>
    </TabView> -->
    <StackLayout>
      <Button text="Sign in" @tap="onLoginTap" class="btn btn-primary" v-if="!accessToken" />
      <StackLayout v-if="accessToken">
        <StackLayout padding="0 10">
          <Label text="BenZ" fontSize="50" marginBottom="5" />
          <Button text="Sign out" class="btn btn-primary" />
        </StackLayout>
        <ScrollView>
          <StackLayout>
            <FlexboxLayout
              v-for="item of playlist"
              :key="item.id"
              height="100"
              color="white"
              marginBottom="10"
              @tap="$navigateTo(PlaylistItem, {
                props: {
                  playlistTitle: item.snippet.title,
                  playlistId: item.id,
                  accessToken
                }
              })"
              padding="0 10"
            >
              <Image
                :src="item.snippet.thumbnails.high.url"
                width="150"
                marginRight="10"
              />
              <Label :text="item.snippet.title" padding="0" :textWrap="true" width="200" fontSize="10" />
            </FlexboxLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
    </StackLayout>
  </Page>
</template>

<script>
  var auth_service_1 = require("../auth-service");
	const listOfItems = [
		{ id: 1, title: 'Learn NativeScript' },
		{ id: 2, title: 'Learn NativeScript-Vue' }
	]
	import {
      TNSPlayer
  } from "nativescript-audio";
  import PlaylistItem from './PlaylistItem';
  export default {
    data() {
      return {
        isPlaying: false,
        playlist: [],
        accessToken: '',
        user: {},
        PlaylistItem
      }
    },
    created() {
    	const audio = new TNSPlayer();
      this.audio = audio;
    },
    mounted() {
   //  	const regionCode = {
   //  		1: 'vn',
   //  		2: 'kr',
   //  		3: 'us'
   //  	}
   //  	function getRandomIntInclusive(min = 1, max = 3) {
			//   min = Math.ceil(min);
			//   max = Math.floor(max);
			//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
			// }
   //  	fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&part=snippet&fields=items(id,snippet(title,thumbnails(high)))&regionCode=${regionCode[getRandomIntInclusive()]}&chart=mostPopular&videoCategoryId=10`)
   //    	.then(res => res.json())
   //    	.then(data => {
   //    		this.playlist = data.items
   //    	})
    },
    methods: {
    	async handleBtnClick() {
    		this.isPlaying ? await this.audio.pause() : this.audio.resume();
    		this.isPlaying = !this.isPlaying;
    	},
    	async loadAudio(id) {
    		this.isPlaying = false;
    		this.audio.pause();
    		fetch(`http://192.168.1.2:3000/${id}`)
    			.then(res => res.json())
    			.then(data => {
	      		this.audio.playFromUrl({
	      			audioFile: data.url
	      		});
	      		this.isPlaying = true;
	      	})
    	},
      onLoginTap() {
        auth_service_1.tnsOauthLogin("google", async tokenResult => {
          this.accessToken = tokenResult.accessToken;
          console.log(tokenResult.accessToken);
          const res = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=5&mine=true&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg',
            {
              headers: {
                'Authorization': `Bearer ${tokenResult.accessToken}`,
                'Accept': 'application/json'
              }
            });
          const data = res.json();
          this.playlist = data.items;
        })
      },
      onLogoutTap() {
        auth_service_1.tnsOauthLogout();
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #000022;
        color: #ffffff;
    }
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .btn {
      height: 100px;
      width: 200px;
    }
    .btn-primary {
      background: #50B9F7;
      color: white;
    }
</style>
