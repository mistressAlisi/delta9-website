from django.shortcuts import render,redirect


def home_2d(request):
    return render(request,"presentation-index-2d.html",{})

def benefits(request):
    return render(request,"presentation-benefits.html",{})

def spectrum(request):
    return render(request,"presentation-spectrum.html",{})


def mobile(request):
    return render(request,"presentation-index-mobi.html",{})


# Create your views here.
def home(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-index-mobi.html",{})
    else:
        return render(request,"presentation-index.html",{})
