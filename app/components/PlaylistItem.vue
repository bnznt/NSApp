<template>
	<Page>
		<ActionBar :title="playlistTitle">
			<NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack" />
		</ActionBar>
		<StackLayout backgroundColor="#1C2541">
			<Button
				:text="isPlaying ? 'Pause' : 'Play'"
				@tap="playBtnTap"
				class="btn btn-primary"
			/>
			<ScrollView>
				<StackLayout>
					<FlexboxLayout
	          v-for="item of videoList"
	          :key="item.id"
	          height="100"
	          color="white"
	          marginBottom="10"
	          padding="0 10"
	          @tap="$emit('play', item.contentDetails.videoId)"
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
	</Page>
</template>

<script>
	import { TNSPlayer } from "nativescript-audio";
	export default {
		name: 'PlaylistItem',
		data() {
			return {
				videoList: [],
				isPlaying: false
			}
		},
		props: {
			playlistId: {
				type: String,
				required: true
			},
			playlistTitle: {
				type: String
			},
			accessToken: String
		},
		async mounted() {
			const data = await fetch(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&playlistId=${
					this.playlistId
				}`,
				{
					headers: {
						'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json'
					}
				}
			)
			.then(res => res.json())
			.then(data => data);
			this.videoList = data.items;
			this.audio = new TNSPlayer();
		},
		methods: {
			async loadAudio(id) {
    		this.isPlaying = false;
    		this.audio.pause();
    		fetch(`http://192.168.1.4:3000/video/${id}`)
    			.then(res => res.json())
    			.then(data => {
    				console.log(data.url);
	      		this.audio.playFromUrl({
	      			audioFile: data.url
	      		})
		      		.then(res => {
		      			this.isPlaying = true;
		      			console.log('/* AUDIO LOGGG */', res);
		      		})
		      		.catch(err => console.log('/* ERROR */', err))
	      	})
    	},
    	playBtnTap() {
    		this.isPlaying ? this.audio.pause() : this.audio.resume();
    		this.isPlaying = !this.isPlaying;
    	}
		}
	}
</script>

<style>
	.btn {
    height: 100px;
    width: 200px;
  }
  .btn-primary {
    background: #50B9F7;
    color: white;
  }
</style>