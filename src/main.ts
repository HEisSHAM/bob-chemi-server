import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의되지 않은 속성 자동 필터링
      forbidNonWhitelisted: true, // dto에 정의되지 않은 속성에 대한 요청 거부
      transform: true, // 요청 데이터를 dto 형식에 맞게 변환(i.e 문자열로 전송된 숫자를 숫자로 변환)
    })
  ); //전역 유효성 검사 파이프라인

  const config = new DocumentBuilder() // swagger setup
    .setTitle("Bob - chemi Documentation") //제목
    .setDescription("앱 개발시 사용되는 서버 API에 대한 연동 문서입니다.") // 설명
    .setVersion("1.0") //버전
    .addTag("REVIEW") //API 그룹을 나타내는데 사용
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  //위의 코드를 실행하면 /api 엔드포인트에서 Swagger UI를 통해 API 문서에 액세스

  await app.listen(3000);
}
bootstrap();
