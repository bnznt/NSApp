<template>
  <Page>
    <ActionBar title="iTube" />
    <StackLayout backgroundColor="#1C2541">
      <Button text="Sign in" @tap="onLoginTap" class="btn btn-primary" v-if="!accessToken" />
      <StackLayout v-if="accessToken">
        <FlexboxLayout padding="0 10">
          <Label text="BenZ" fontSize="50" marginBottom="5" />
          <Button text="Sign out" class="btn btn-primary" @tap="onLogoutTap" />
        </FlexboxLayout>
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
                  accessToken,
                  audio
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
  import PlaylistItem from './PlaylistItem';
  const audio = require('nativescript-audio');
  export default {
    data() {
      return {
        isPlaying: false,
        playlist: [],
        accessToken: '',
        PlaylistItem
      }
    },
    created() {
      const player = new audio.TNSPlayer();
      player
      .playFromUrl({
        audioFile: 'https://data.chiasenhac.com/dataxx/00/downloads/1822/1/1821295-2be93cf2/320/Em%20Gai%20Mua%20-%20Huong%20Tram.mp3'
      })
      .then(function(res) {
        console.log('/* AUDIO LOGGG */');
      })
    },
    methods: {
    	async handleBtnClick() {
    		this.isPlaying ? await this.audio.pause() : this.audio.resume();
    		this.isPlaying = !this.isPlaying;
    	},
    	async play(id) {
    		this.isPlaying = false;
    		this.audio.pause();
    		fetch(`http://192.168.1.4:3000/video/${id}`)
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
          console.log(this.accessToken);
          const data = await fetch(
            'https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=5&mine=true&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg',
            {
              headers: {
                'Authorization': `Bearer ${tokenResult.accessToken}`,
                'Accept': 'application/json'
              }
            }
          )
          .then(res => res.json())
          .then(data => data);
          console.log(data);
          this.playlist = data.items;
        })
      },
      onLogoutTap() {
        auth_service_1.tnsOauthLogout();
        this.accessToken = '';
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
