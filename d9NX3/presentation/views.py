from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request,"presentation-index.html",{})

def home_2d(request):
    return render(request,"presentation-index-2d.html",{})

def benefits(request):
    return render(request,"presentation-benefits.html",{})

def spectrum(request):
    return render(request,"presentation-spectrum.html",{})
