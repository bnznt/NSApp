<template>
	<Page>
		<ActionBar :title="playlistTitle">
			<NavigationButton android.systemIcon="ic_menu_back" @tap="$navigateBack" />
		</ActionBar>
		<ScrollView>
			<StackLayout>
				<FlexboxLayout
          v-for="item of videoList"
          :key="item.id"
          height="100"
          color="white"
          marginBottom="10"
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
	</Page>
</template>

<script>
	export default {
		name: 'PlaylistItem',
		data() {
			return {
				videoList: []
			}
		},
		props: {
			playlistId: {
				type: String,
				required: true
			},
			playListTitle: {
				type: String
			},
			accessToken: String
		},
		async mounted() {
			const res = await fetch(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&key=AIzaSyCEFZFqOJqpQz5NZrU214nQr1yHIuaxDLg&playlistId=${
					this.playlistId
				}`,
				{
					headers: {
						'Authorization': `Bearer ${this.accessToken}`,
            'Accept': 'application/json'
					}
				}
			);
			const data = res.json();
			this.videoList = data;
		}
	}
</script>