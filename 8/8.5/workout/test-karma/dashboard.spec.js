var $ = require('jquery');
var dashboard = require('../public/js/app/dashboard');

describe('Dashboard', function () {
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should load events with volunteers when no events returned', function () {
        var url = '/api/events';
        var data = {'data': []};
        var html = '<p>No events with volunteers</p>';

        var eventSpy, jQueryStub, event, element, elementStub;
        event = element = {};

        eventSpy = event.preventDefault = sandbox.spy();
        elementStub = element.html = sandbox.stub();
        jQueryStub = sandbox.stub($, 'getJSON', function () {
            var deferred = $.Deferred();

            deferred.resolve(data);

            return deferred.promise();
        });

        var dashboardMock = sandbox.mock(dashboard);
        dashboardMock.expects('renderDashboardTemplate')
            .withArgs(data)
            .once()
            .returns(html);
        dashboardMock.expects('getEventsWithVolunteersElement')
            .once()
            .returns(element);
        dashboardMock.expects('getEventsWithVolunteersUrl')
            .withArgs(element)
            .once()
            .returns(url);

        dashboard.onDashboardLoad(event);

        dashboardMock.verify();

        eventSpy.calledOnce.should.be.true;
        jQueryStub.calledOnce.should.be.true;
        elementStub.withArgs(html).calledOnce.should.be.true;
    });

    it('should return the URL from an element', function () {
        var element = linkElement = {};
        var url = '/api/events';

        var elementStub = element.find = sandbox.stub();
        elementStub.withArgs('a:first').returns(linkElement);

        var linkElementStub = linkElement.attr = sandbox.stub();
        linkElementStub.withArgs('href').returns(url);

        var returnedUrl = dashboard.getEventsWithVolunteersUrl(element);

        elementStub.withArgs('a:first').calledOnce.should.be.true;
        linkElementStub.withArgs('href').calledOnce.should.be.true;
        returnedUrl.should.equal(url);
    });

    it('should return the empty string if element for not found');

    it('should render the dashboard template');

    it('should return the events with volunteers element');
});
