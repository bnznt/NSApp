<template>
    <Page>
      <ActionBar title="Welcome to iTube!"/>
      <StackLayout backgroundColor="#3c495e">
        <!-- <DockLayout stretchLastChild="true">
        </DockLayout> -->
        <StackLayout class="p-20">    
          <Button dock="bottom" :text="isPlaying ? 'Pause' : 'Play'" @tap="handleBtnClick" class="btn-primary" />
          <Button text="Login" @tap="onLoginTap()" class="btn btn-primary btn-active"/>
          <Button text="Logout" @tap="onLogoutTap()" class="btn btn-primary btn-active"/>
        </StackLayout>
        <ScrollView orientation="vertical">
	        <StackLayout
	        	orientation="vertical"
        	>
	          <DockLayout
	          	v-for="item of videoList"
	          	:key="item.id"
	          	height="100"
	          	color="white"
	          	marginBottom="10"
	          	@tap="loadAudio(item.id)"
	          	:stretchLastChild="true"
          	>
	          	<Image
	          		dock="left"
	          		:src="item.snippet.thumbnails.high.url"
	          		width="150"
          		/>
	          	<Label dock="right" :text="item.snippet.title" padding="0" :textWrap="true" />
	          </DockLayout>
					</StackLayout>
        </ScrollView>
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
  export default {
    data() {
      return {
        msg: 'Hello World!',
        isPlaying: false,
        videoList: [],
        accessToken: 'XYZ ABC'
      }
    },
    created() {
    	const audio = new TNSPlayer();
      this.audio = audio;
    },
    mounted() {
    	const regionCode = {
    		1: 'vn',
    		2: 'kr',
    		3: 'us'
    	}
    	function getRandomIntInclusive(min = 1, max = 3) {
			  min = Math.ceil(min);
			  max = Math.floor(max);
			  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
			}
    	fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&part=snippet&fields=items(id,snippet(title,thumbnails(high)))&regionCode=${regionCode[getRandomIntInclusive()]}&chart=mostPopular&videoCategoryId=10`)
      	.then(res => res.json())
      	.then(data => {
      		this.videoList = data.items
      	// 	.map(item => ({
      	// 		id: item.id,
      	// 		title: item.snippet.title,
      	// 		thumbnails: item.thumbnails.high.url
    			// }))
      	})
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
        auth_service_1.tnsOauthLogin("google", tokenResult => {
          this.accessToken = tokenResult.accessToken;
          fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=5&mine=true&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg',
            {
              headers: {
                'Authorization': `Bearer ${tokenResult.accessToken}`,
                'Accept': 'application/json'
              }
            })
          .then(res => {
            console.log(res.status)
            return res.json();
          })
          .then(data => {
            console.log(data);
            this.videoList = data.items;
          })
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
    .btn-primary {
      background: #50B9F7; color: white; margin: 10px 0; height: 150px
    }
</style>
