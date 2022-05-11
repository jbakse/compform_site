// pipe 


difference() {
    
    union() {
        cylinder(h = 20, r = 5, center = true);
        rotate([0,90,0]) cylinder(h = 20, r = 5, center = true);
    }

    #union() {
        cylinder(h = 30, r = 3, center = true);
        rotate([0,90,0]) cylinder(h = 30, r = 3, center = true);
    }

}