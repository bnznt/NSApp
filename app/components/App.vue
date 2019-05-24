<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Label class="message" :text="msg" col="0" row="0"/>
        </GridLayout>
    </Page>
</template>

<script>
	const uri = 'https://r1---sn-8pxuuxa-q5q6.googlevideo.com/videoplayback?id=o-AFbtdp_Pii8hUcobxA5XJKJldYQykl1ImV4lZNgIazPM&itag=18&source=youtube&requiressl=yes&mm=31%2C29&mn=sn-8pxuuxa-q5q6%2Csn-8pxuuxa-nboer&ms=au%2Crdu&mv=m&pl=21&ei=JK3mXLqBNv-A3LUPzeyLsAg&initcwndbps=861250&mime=video%2Fmp4&gir=yes&clen=17022851&ratebypass=yes&dur=210.140&lmt=1540863640460025&mt=1558621351&fvip=1&beids=9466587&c=WEB&txp=5531432&ip=171.248.4.227&ipbits=0&expire=1558643077&sparams=ip%2Cipbits%2Cexpire%2Cid%2Citag%2Csource%2Crequiressl%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cei%2Cinitcwndbps%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&key=yt8&signature=CED7AA69AAD8170569CC57DA05105E8EA30A98EE.779CECF831C252C72772FAF94A907DB1E16A02F4'
	import {
      TNSPlayer
  } from "nativescript-audio";
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    },
    created() {
    	const audio = new TNSPlayer();
      this.audio = audio;
      this.audio
        .playFromUrl({
            audioFile: uri // "https://data.chiasenhac.com/dataxx/32/downloads/1932/4/1931243-03357d7e/m4a/Suyt%20Nua%20Thi%20-%20Andiez.m4a",
        })
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
