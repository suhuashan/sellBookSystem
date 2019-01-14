<template>
    <div class="sellPage">
        <div class="header">发布卖书信息</div>
        <div class="publish">
            <ul class="bookInfo">
                <li class="bookName">
                    <input type="text" placeholder="填写书籍名称" v-model="bookName">
                </li>
            </ul>
            <textarea rows="5" class="bookDescription" placeholder="填写书籍描述...(不超过100字)" v-model="bookDesc"></textarea>
            <div class="publisherInfo">
                <div class="addPhoto">
                    <label class="iconfont icon-jiahao" for="file" v-show="fileImage==''">
                        <input type="file" id="file" @change="showImage()" accept="image/*">
                    </label>
                    <div class="cancel" @click="cancel" v-show="fileImage!=''">x</div>
                    <label>
                        <img :src="fileImage" alt="上传图片" class="file-image" v-show="fileImage!=''"  @click="popupVisible=true">
                    </label>
                    <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup-1">
                        <img :src="fileImage" alt="原图">
                    </mt-popup>
                </div>
                <div class="detailInfo">
                    <ul>
                        <li>
                            <label id="lblSelect">
                                <select length="5" class="places selectPointOfInterest" v-model="position">
                                    <option disabled value="">交易地点</option>
                                    <option value="文山湖">文山湖</option>
                                    <option value="桂庙">桂庙</option>
                                    <option value="文科楼">文科楼</option>
                                    <option value="西南">西南</option>
                                    <option value="南区">南区</option>
                                    <option value="斋区">斋区</option>
                                    <option value="西南">西南</option>
                                    <option value="元平体育馆">元平体育馆</option>
                                    <option value="科技楼">科技楼</option>
                                    <option value="图书馆">图书馆</option>
                                    <option value="西丽">西丽</option>
                                    <option value="其他">其他</option>
                                </select>
                            </label>     
                        </li>
                        <li><input type="text" placeholder="微信" v-model="weixin"></li>
                        <li><input type="text" placeholder="手机" v-model="phone"></li>
                    </ul>
                </div>
            </div>
            <div class="submit" @click="publish">立即发布</div>
        </div>  
    </div>
</template>

<script>
import lrz from "../../node_modules/_lrz@4.9.40@lrz/dist/lrz.all.bundle";
import {formateTime,dataURLtoFile} from "../util.js";
import { MessageBox } from 'mint-ui';
export default {
  name: 'sellPage',
  data () {
    return {
        popupVisible: false,
        files: [],
        fileImage: "",
        fileImageName: "",
        upImage: [],
        bookName: "",
        bookDesc: "",
        position: "",
        weixin: localStorage.getItem("weixin"),
        phone: localStorage.getItem("phone"),
        time: "",
        avatar: ""
    }
  },
  activated() {
      if(!localStorage.getItem("username")){
          MessageBox.confirm('登录之后才能发布信息哦!').then(action => {
              this.$router.push('/mine');
          });
      }
      this.weixin = localStorage.getItem("weixin");
      this.phone = localStorage.getItem("phone");
      this.bookName = "";
      this.bookDesc = "";
      this.fileImage = "";
      this.position = "";
  },
  methods: {
      cancel() {
        this.fileImage = "";
        document.getElementById("file").value = "";
        this.upImage = [];
      },
      showImage() {
        let file = document.getElementById("file").files[0];
        let _this = this;
        lrz(file)
            .then(function(rst) {
            // 处理成功会执行
            console.log(rst);
            _this.fileImage = rst.base64;
            _this.fileImageName = rst.origin.name;
            // _this.avatar = dataURLtoFile(rst.base64,rst.file.name);
            // _this.upImage=_this.upImage.concat(file);
            _this.upImage = rst.file;
            Toast("上传成功");
            // 13434998099
            // console.log(_this.upImage);
            // console.log(_this.fileImage);
            })
            .catch(function(err) {
            // 处理失败会执行
                Toast("上传失败");
            })
            .always(function() {
            // 不管是成功失败，都会执行
                console.log("调用上传图片");
            });
        },
        publish() {
            let formData = {
                    "username": localStorage.getItem('username'),
                    "avatar": this.fileImage,
                    "avatarName": this.fileImageName,
                    "bookName": this.bookName,
                    "bookDesc": this.bookDesc,
                    "position": this.position,
                    "weixin": this.weixin,
                    "phone": this.phone,
                    "time": formateTime()
                };
            this.$http({
                method: "POST",
                url: "/sell/doPublish",
                data: formData
            }).then((res) => {
                if(res.data.status == '0'){
                    MessageBox.confirm('确定发布吗?').then(action => {
                    this.$router.push({
                        path: '/buy',
                        query: {
                            bookItem: formData
                        }
                    });
                });
                }else{
                    MessageBox.alert("发布失败");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .sellPage{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(165, 162, 162, 0.6);
        color: #df1d3d;
        .header{
            position: relative;
            width: 100%;
            height: 4rem;
            background: #df1d3d;
            text-align: center;
            line-height: 4rem;
            font-size: 2rem;
            color:#fff;
            font-weight: 400;
        }
        .publish{
            width: 80%;
            height: 38rem;
            margin: 2rem auto;
            background: #fff;
            border-radius: 0.9rem;
            padding: 1.5rem 2rem;
            .bookInfo{
                width: 90%;
                font-size: 1.5rem;
                li{
                    margin-top: 2rem;
                    border-bottom: 0.15rem #df1d3d solid;
                }
                input[type=text]{
                    outline: 0;
                    height: 2rem;
                    line-height: 2rem;
                }
            }
            .bookDescription{
                font-size: 1.5rem;
                width: 90%;
                height: 12rem;
                margin: 2rem auto;
                outline: 0;
                border: 0;
                border-bottom: 0.15rem #df1d3d dashed;
            }          
            .publisherInfo{
                display: flex;
                .addPhoto{
                    position: relative;
                    width: 5rem;
                    height: 5rem;
                    line-height: 5rem;
                    border: 0.1rem solid #df1d3d;
                    margin-left: 1rem;
                    #file{
                        display: none;
                    }
                }
            }
        }
    }

    





    .cancel {
        background: #df1d3d;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: center;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 0;
        right: 0;
    }
    .addPhoto label{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        color: #df1d3d;
        font-weight: 800;
        font-size: 4rem;
    }
    .file-image{
        width: 5rem;
        height: 5rem;
    }
    .mint-popup-1{
        height: 25rem;
    }
    .mint-popup-1 img{
        width: 25rem;
        height: 25rem;
        border-radius: 0.5rem;
    }
    .detailInfo{
        flex: 1;
        margin-left: 4rem;
    }
    .detailInfo li{
        margin-bottom: 0.8rem;
    }
    .detailInfo input{ 
        outline: 0;
        border: 0.1rem solid #df1d3d;
        border-radius: 0.3rem;
        width: 80%;
        height: 1.5rem;
        line-height: 1.5rem;
    }

    .places{
        width: 80%;
        outline: 0;
        border: 0.1rem solid #df1d3d;
        border-radius: 0.3rem;
        color: df1d3d;
        background: #fff;
        cursor: pointer;
    }
    

    .submit{
        text-align: center;
        display: block;
        width: 10rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.8rem;
        background: #df1d3d;
        color: #fff;
        outline: 0;
        border-radius: 0.9rem;
        margin: 3rem auto;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
        color: rgb(247, 139, 137);
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: rgb(247, 139, 137);
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: rgb(247, 139, 137);
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: rgb(247, 139, 137);
    }
    /* #lblSelect{
        position: relative; 
        display: inline-block
    }
    #lblSelect::after{
        content: "\25bc";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 20pt;
        line-height: 40pt;
        vertical-align: middle;
        text-align: center;
        background: #94c1e7;
        color: #2984ce;
        -moz-border-radius: 0 6px 6px 0;
        -webkit-border-radius: 0 6px 6px 0;
        border-radius: 0 6px 6px 0;
        pointer-events: none;
    }
    select#selectPointOfInterest
    {
        width: 185pt;
        height: 40pt;
        line-height: 40pt;
        padding-right: 20pt;
        text-indent: 4pt;
        text-align: left;
        vertical-align: middle;
        border: 1px solid #94c1e7;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        font-family: SimHei;
        font-size: 18pt;
        font-weight: 500;
        color: RGBA(102,102,102,0.7);
        cursor: pointer;
        outline: none;
    } */
</style>
