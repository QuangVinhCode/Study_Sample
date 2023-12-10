package edu.vn.study.controller;


import edu.vn.study.domain.Class;
import edu.vn.study.domain.Subject;
import edu.vn.study.dto.SubjectDto;
import edu.vn.study.service.ClassService;
import edu.vn.study.service.MapValidationErrorService;
import edu.vn.study.service.SubjectService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/subjects")
public class SubjectController {
    @Autowired
    SubjectService subjectService;

    @Autowired
    ClassService classService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @PostMapping
    public ResponseEntity<?> createSubject(@Valid @RequestBody SubjectDto dto, BindingResult result){

        ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);
        if (responseEntity != null) {
            return responseEntity;
        }

        // Check if the classInfo is provided in the SubjectDto
        if (dto.getClassInfo() == null || dto.getClassInfo().getId() == null) {
            return new ResponseEntity<>("Lớp để tạo môn học", HttpStatus.BAD_REQUEST);
        }

        // Fetch the existing Class entity by ID
        Class existingClass = classService.findById(dto.getClassInfo().getId());
        if (existingClass == null) {
            return new ResponseEntity<>("Lớp với id: " + dto.getClassInfo().getId() + " không tìm thấy", HttpStatus.NOT_FOUND);
        }

        // Create a new Subject entity and set its properties
        Subject newSubject = new Subject();
        newSubject.setSubjecttitle(dto.getSubjecttitle());
        newSubject.setClassInfo(existingClass);

        // Save the new Subject entity
        Subject createdSubject = subjectService.save(newSubject);

        // Create a new SubjectDto to return in the response
        SubjectDto responseDto = new SubjectDto();
        BeanUtils.copyProperties(createdSubject, responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable("id") Long id, @RequestBody SubjectDto dto){
        Subject existingSubject = subjectService.findById(id);
        if (existingSubject == null) {
            return new ResponseEntity<>("Môn học với id " + id + " không tìm thấy", HttpStatus.NOT_FOUND);
        }

        // Copy properties from DTO to existing entity
        BeanUtils.copyProperties(dto, existingSubject);

        // Check if the classInfo is provided in the SubjectDto
        if (dto.getClassInfo() != null && dto.getClassInfo().getId() != null) {
            // Fetch the existing Class entity by ID
            Class existingClass = classService.findById(dto.getClassInfo().getId());
            if (existingClass == null) {
                return new ResponseEntity<>("Lớp với id " + dto.getClassInfo().getId() + " không tìm thấy", HttpStatus.NOT_FOUND);
            }

            // Set the existing Class entity to the Subject
            existingSubject.setClassInfo(existingClass);
        }

        // Save the updated Subject entity
        Subject updatedSubject = subjectService.save(existingSubject);

        // Create a new SubjectDto to return in the response
        SubjectDto responseDto = new SubjectDto();
        BeanUtils.copyProperties(updatedSubject, responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<?> getSubjects(){
        return new ResponseEntity<>(subjectService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getSubject(@PathVariable("id") Long id){
        return new ResponseEntity<>(subjectService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable("id") Long id)
    {
        subjectService.deleteById(id);

        return  new ResponseEntity<>("Môn có id " + id + " đã được xóa",HttpStatus.OK);
    }
}
