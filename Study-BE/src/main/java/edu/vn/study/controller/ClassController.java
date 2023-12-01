package edu.vn.study.controller;


import edu.vn.study.domain.Class;
import edu.vn.study.dto.ClassDto;
import edu.vn.study.exception.ClassException;
import edu.vn.study.service.ClassService;
import edu.vn.study.service.MapValidationErrorService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/classes")
public class ClassController {
    @Autowired
    ClassService classService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @PostMapping
    public ResponseEntity<?> createClass(@Valid @RequestBody ClassDto dto, BindingResult result){

       ResponseEntity<?> responseEntity = mapValidationErrorService.mapValidationFields(result);

       if (responseEntity != null)
       {
           return responseEntity;
       }
        Class entity = new Class();
        BeanUtils.copyProperties(dto,entity);

        entity = classService.save(entity);

        dto.setId(entity.getId());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateClass(@PathVariable("id") Long id, @RequestBody ClassDto dto){
        Class entity = new Class();
        BeanUtils.copyProperties(dto,entity);

        entity = classService.update(id,entity);

        dto.setId(entity.getId());

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<?> getClasses(){
        return new ResponseEntity<>(classService.findAll(),HttpStatus.OK);
    }

    @GetMapping("/{id}/get")
    public  ResponseEntity<?> getClasses(@PathVariable("id") Long id){
        return new ResponseEntity<>(classService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClasses(@PathVariable("id") Long id)
    {
        classService.deleteById(id);

        return  new ResponseEntity<>("Lớp có id " + id + " đã được xóa",HttpStatus.OK);
    }
}
