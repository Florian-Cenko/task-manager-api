package com.example.taskmanager.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL) //Κοίτα, το αφεντικό της σχέσης είναι η μεταβλητή category που βρίσκεται μέσα στο Task.
    @JsonIgnoreProperties("category")
    private List<Task> tasksList;

    public Category(){
    }

    public Category(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
