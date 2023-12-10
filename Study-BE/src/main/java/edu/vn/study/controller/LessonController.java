package edu.vn.study.controller;


import edu.vn.study.domain.Lesson;
import edu.vn.study.domain.Subject;
import edu.vn.study.dto.LessonDto;
import edu.vn.study.dto.SubjectDto;
import edu.vn.study.exception.FileNotFoundException;
import edu.vn.study.service.FileStorageService;
import edu.vn.study.service.LessonService;
import edu.vn.study.service.MapValidationErrorService;
import edu.vn.study.service.SubjectService;
import lombok.var;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/lessons")
public class LessonController {

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    SubjectService subjectService;

    @Autowired
    LessonService lessonService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createLesson(@Valid @ModelAttribute LessonDto dto, BindingResult result){

        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        // Save the new Subject entity
        Lesson createdLesson = lessonService.save(dto);
        dto.setId(createdLesson.getId());
        dto.setLessonname(createdLesson.getLessonname());
        SubjectDto subjectDto = new SubjectDto();
        subjectDto.setId(createdLesson.getId());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("/content/{filename:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = fileStorageService.loadPDFFileAsResource(filename);

        String contentType = null;

        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

        }catch (Exception ex)
        {
            throw new FileNotFoundException("Không thể mở tệp tin. ");
        }

        if (contentType == null)
        {
            contentType= "application/octet-stream";
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=\""
                + resource.getFilename() + "\"")
                .body(resource);
    }

    @PatchMapping(value = "/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateLesson(
            @PathVariable Long id,@Valid @ModelAttribute LessonDto dto, BindingResult result){

        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        // Save the new Subject entity
        Lesson createdLesson = lessonService.update(id,dto);

        dto.setId(createdLesson.getId());
        dto.setLessonname(createdLesson.getLessonname());
        SubjectDto subjectDto = new SubjectDto();
        subjectDto.setId(createdLesson.getId());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    @GetMapping()
    public ResponseEntity<?> getLessons(){
//        var list = lessonService.findAll();
//        var newList =list.stream().map(item -> {
//            LessonDto dto = new LessonDto();
//            BeanUtils.copyProperties(item,dto);
//
//            return dto;
//        }).collect(Collectors.toList());
        return new ResponseEntity<>(lessonService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<?> getLessons(@RequestParam("query") String query,
                                        @PageableDefault(size = 2,sort = "lessonname",
                                     direction = Sort.Direction.ASC) Pageable pageable){
        var list = lessonService.findByName(query,pageable);

        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/page")
    public ResponseEntity<?> getLessonPage(
            @PageableDefault(size = 5,sort = "lessonname",direction = Sort.Direction.ASC)
            Pageable pageable){
//        var list = lessonService.findAll(pageable);
//        var newList =list.stream().map(item -> {
//            LessonDto dto = new LessonDto();
//            BeanUtils.copyProperties(item,dto);
//            return dto;
//        }).collect(Collectors.toList());
        return new ResponseEntity<>(lessonService.findAll(pageable),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getLesson(@PathVariable("id") Long id){
        return new ResponseEntity<>(lessonService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable("id") Long id)
    {
        lessonService.deleteById(id);

        return  new ResponseEntity<>("Bài học có id " + id + " đã được xóa",HttpStatus.OK);
    }
}
