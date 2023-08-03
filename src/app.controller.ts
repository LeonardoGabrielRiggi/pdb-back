import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const fs = require('fs')

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.getAllPostByLocation()
  }

  @Post('uploadPost')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:(req, file, cb)=>{ 
          cb( null, 'public/img/'+file.originalname.split('_')[0]);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname.split('_')[1]);
        },
      }),
    }),
  )
  async local(@UploadedFile() file: Express.Multer.File, @Body() uploadedFileInformations:UploadedFileInfos) {
    console.log(file)
    console.log(uploadedFileInformations.dateTime)
    return {
      statusCode: 200,
      data: file.path,
    };
  }

  
  allPosts:any;
  getAllPostByLocation(){
    return fs.readFile('./../public/database/posts.json', 'utf8', (error, data) => {
      // 2
      if (error) {
        console.log(`ERROR: ${error}`)
        return
      }
    
      // 3
      const jsonData = JSON.parse(data)
      
      // 4
      this.allPosts = jsonData
      
      // 5
      // Check the keys that jsonData has
      console.log(Object.keys(jsonData))
    
      // 6
      jsonData.frameworks.forEach(framework => {
        console.log(`Framework: ${framework}`)
      })
      return jsonData
    })
  }


}




export interface UploadedFileInfos{
  file_id:string;
  dateTime:Date;
  user_id:string;
  pre_path:string;
  tags_id?:string[];
  likes:number;
  note:string;
}
