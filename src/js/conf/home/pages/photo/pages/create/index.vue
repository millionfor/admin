<template>
  <div class="photo-create-index">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'photo-list' }">照片列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加照片</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conditions">

    </div>
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.photosTitle"></el-input>
        </el-form-item>
        <el-form-item label="置顶">
          <el-radio-group v-model="form.photosRecommended">
            <el-radio :label="true">置顶</el-radio>
            <el-radio :label="false">不置顶</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传分类">
          <el-select v-model="form.classifysId" placeholder="请选择" :disabled="$route.params.id">
            <el-option
                    v-for="item in classifysList"
                    :key="item.classifys_id"
                    :label="item.classifys_cn_name + '-' +item.classifys_en_name"
                    :value="item.classifys_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传图片">
          <div>
            <el-upload
                    class="upload-demo"
                    :http-request="uploadFile"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    multiple="true"
                    list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3M</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.photosDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" :loading="isLoading">{{isLoading ? '照片上传中' : ($route.params.id ? '更新照片' :'创建照片') }}</el-button>
          <router-link :to="{ name: `photo-list`}">
            <el-button >取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import io from '@/module/io'
  import stackIo from './_source/stackIo'
  import { getBase64 } from '@/module/util'
  import { Input, Radio } from 'element-ui'

  export default {
    name: 'photo-create-index',
    data () {
      return {
        isLoading: false,
        fileList: [],
        form: {
          photosTitle: '',
          photosRecommended: false,
          photosDesc: '',
          photosCover: 0,
          classifysId: null,
          classifysEnName: '',
          classifysCnName: ''
        },
        classifysList: [],
        filePaths: []
      }
    },
    props: {},
    methods: {
      handleRemove (file, fileList) {
        let o = _.filter(this.filePaths, v => v.pathName === file.name)[0]
        io.post('photos/deletePictures', {
          pathName: o.imgInfo.key
        }, res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.filePaths = _.filter(this.filePaths, v => v.pathName !== file.name)
          this.form.photosCover = this.filePaths[0].sort
        }).catch(e => {
          this.$message.error(e.msg)
        })
      },
      uploadFile ({ file }) {
        this.isLoading = true
        setTimeout(() => {
          getBase64(window.URL.createObjectURL(file))
            .then((base64) => {
              let i = _.findIndex(this.filePaths, v => v.pathName === file.name)
              if (i === -1) {
                stackIo(() => {
                  return this.rtIoUpload({
                    file: file,
                    base64: base64
                  })
                }, (po) => {
                  po.then(res => {
                    this.filePaths.push({
                      pathName: file.name,
                      sort: this.filePaths.length,
                      imgInfo: res.data
                    })
                    this.$notify({
                      title: '上传成功',
                      message: `图片 ${file.name} 上传到(${this.getClassifysName(this.form.classifysId)['classifys_cn_name']})成功！`,
                      type: 'success'
                    })
                    this.handleAddRecords({
                      fileLeg: this.filePaths.length - 1
                    })
                    this.isLoading = false
                  }).catch(e => {
                    this.$message({ message: e.msg, type: 'error' })
                    this.isLoading = false
                  })
                })
              } else {
                this.$message({ message: '图片名称已存在', type: 'error' })
              }
            }, function (err) {
              console.log(err)// 打印异常信息
            })
        }, 100)
      },
      getClassifysName (id) {
        return _.filter(this.classifysList, v => v.classifys_id === id)[0]
      },
      rtIoUpload ({ file, base64 }) {
        return new Promise((resolve, reject) => {
          io.post(`photos/uploadPictures`, res => {
            resolve(res)
          }, e => {
            reject(e)
          }, {
            data: {
              pathName: file.name,
              classifysEnName: this.getClassifysName(this.form.classifysId)['classifys_en_name'],
              blobSrc: base64
            },
            emulateJSON: false,
            timeout: 99999999
          })
        })
      },
      onSubmit () {
        let id = this.$route.params.id || null
        if (id) {
          this.form.photosId = parseInt(id)
        }

        let classifys = this.getClassifysName(this.form.classifysId)

        this.form.classifysEnName = classifys['classifys_en_name']
        this.form.classifysCnName = classifys['classifys_cn_name']

        io.post(`photos/${this.$route.params.id ? 'update' : 'create'}`, res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$router.push({ name: 'photo-list' })
          this.isLoading = false
        }, e => {
          this.$message.error(e.msg)
          this.isLoading = false
        }, {
          data: Object.assign(this.form, {}, {
            filePaths: this.filePaths
          }),
          emulateJSON: false,
          timeout: 99999999
        })
      },
      getDetails () {
        return new Promise((resolve, reject) => {
          io.post('photos/findById', { photosId: parseInt(this.$route.params.id) }).then(res => {
            let data = res.data[0]
            this.form.photosTitle = data.photos_title
            this.form.photosRecommended = data.photos_recommended
            this.form.photosDesc = data.photos_desc
            this.form.photosCover = data.photos_cover
            this.form.classifysId = data.classifys_id
            this.fileList = _.map(data.photos_path, (v, i) => {
              return Object.assign(v, {}, {
                name: v['pathName'],
                url: v['imgInfo']['imageView']
              })
            })
            this.filePaths = data.photos_path
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      },
      getClassifysList () {
        return new Promise((resolve, reject) => {
          io.get('classifys/list').then(res => {
            this.classifysList = res.data
            resolve()
          }).catch(e => {
            reject(e)
          })
        })
      },
      /**
       * 处理增加一条数据
       */
      handleAddRecords ({ v = {}, fileLeg }) {
        let self = this
        let eqIndex = parseInt(fileLeg)

        // 插入dom
        $('.el-upload-list__item').eq(eqIndex).append(`<div class="el-upload-fromx"><div class="up-radio up-radio-${eqIndex}"></div><div class="up-input up-input-${eqIndex}"></div></div>`)

        // radio
        new Vue({
          render: h => h(Radio, {
            scopedSlots: {
              default: () => {
                return '封面-'
              }
            },
            on: {
              input (event) {
                self.form.photosCover = event
              }
            },
            props: {
              label: v && v.sort || eqIndex,
              value: self.form.photosCover
            }
          })
        }).$mount(`.up-radio-${eqIndex}`)

        // input
        new Vue({
          render: h => h(Input, {
            on: {
              input (val) {
                if (val) {
                  self.filePaths[fileLeg].sort = parseInt(val)
                }
              }
            },
            props: {
              value: v && v.sort || eqIndex
            }
          })
        }).$mount(`.up-input-${eqIndex}`)

        // 创建 默认第一张图为首页
        if (!this.$route.params.id) {
          this.form.photosCover = this.filePaths[0].sort
        }
      }
    },
    watch: {
    },
    beforeCreate () {
    },
    created () {
      if (this.$route.params.id) {
        this.getDetails()
          .then(res => {
            return this.getClassifysList()
          })
          .then(res => {
            _.map(this.filePaths, (v, i) => {
              this.handleAddRecords({
                fileLeg: i,
                v: v
              })
            })
          })
      } else {
        this.getClassifysList().then(res => {
          this.form.classifysId = this.classifysList[0].classifys_id
        })
      }
    },
    beforeMount () {
    },
    mounted () {
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    computed: {},
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .photo-create-index {
    .el-upload-list__item {
      position: relative;
      .el-upload-fromx {
        position: absolute;
        right: 50px;
        top: 25px;
        .el-input {
          width: 60px;
          margin-left: 10px;
          input {
            text-align: center;
          }
        }

      }
    }
  }
</style>
