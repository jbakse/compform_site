// balls
color("gray") {
    sphere(10);
    translate([100, 0, 0]) sphere(10);
}

// bar
rotate([0,90,0]) cylinder(h = 100, r = 2, $fn = 20);

